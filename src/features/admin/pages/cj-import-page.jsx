import { ArrowLeft, ArrowRight, Search, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AdminPageHeader, AdminPanel } from "../components/admin-ui";
import { fieldStyles, primaryButtonStyles, secondaryButtonStyles } from "../components/admin-styles";
import { useCategories } from "../hooks/use-categories";
import { productsService } from "../services/products-service";

export function CjImportPage() {
  const navigate = useNavigate();
  const { categories, error: categoriesError } = useCategories();
  const [options, setOptions] = useState(null);
  const [optionsError, setOptionsError] = useState("");
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", basePrice: "", categoryId: "", isActive: false });
  const [selected, setSelected] = useState({});

  useEffect(() => {
    let cancelled = false;
    productsService.getOptions()
      .then((data) => { if (!cancelled) setOptions(data); })
      .catch((requestError) => { if (!cancelled) setOptionsError(requestError.message); });
    return () => { cancelled = true; };
  }, []);

  async function search(term, nextPage = 1) {
    if (term.trim().length < 2) return;
    setLoading(true);
    setError("");
    setProduct(null);
    setResults(null);
    try {
      const data = await productsService.searchCj(term.trim(), nextPage);
      setResults(data.items);
      setTotalPages(data.totalPages);
      setQuery(term.trim());
      setPage(nextPage);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  async function choose(pid) {
    setBusy(true);
    setError("");
    setProduct(null);
    try {
      const data = await productsService.getCjProduct(pid);
      setProduct(data);
      setSelected({});
      setForm({ name: data.name.slice(0, 180), description: "", basePrice: "", categoryId: "", isActive: false });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  function toggleVariant(variant) {
    setSelected((current) => {
      const updated = { ...current };
      if (updated[variant.vid]) delete updated[variant.vid];
      else if (Object.keys(updated).length < 30) updated[variant.vid] = { vid: variant.vid, sizeId: "", colorId: "", stock: "0" };
      return updated;
    });
  }

  function updateVariant(vid, field, value) {
    setSelected((current) => ({ ...current, [vid]: { ...current[vid], [field]: value } }));
  }

  async function importProduct(event) {
    event.preventDefault();
    if (busy || !product) return;
    const variants = Object.values(selected);
    if (!variants.length) {
      setError("Select at least one CJ variant.");
      return;
    }
    const combinations = variants.map((variant) => `${variant.sizeId}:${variant.colorId}`);
    if (new Set(combinations).size !== combinations.length) {
      setError("Each imported variant must have a distinct size/color combination.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await productsService.importCj({
        pid: product.pid,
        ...form,
        name: form.name.trim(),
        basePrice: Number(form.basePrice),
        categoryId: Number(form.categoryId),
        variants: variants.map(({ vid, sizeId, colorId, stock }) => ({
          vid, sizeId: Number(sizeId), colorId: Number(colorId), stock: Number(stock),
        })),
      });
      navigate("/admin/products", { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <Link to="/admin/products" className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#e94727]">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to products
      </Link>
      <AdminPageHeader eyebrow="Catalog · CJdropshipping" title="Import a product" description="Search CJ, review its images and variants, then set Coral's selling price and inventory." />

      <p className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-900">
        CJ prices are supplier prices in USD, not your selling prices. Stock is entered manually and will not sync with CJ. Imports are saved as drafts unless you choose to publish.
      </p>
      {categoriesError || optionsError || error ? <p role="alert" className="mb-6 rounded-xl bg-red-50 px-5 py-4 text-sm text-red-700">{categoriesError || optionsError || error}</p> : null}

      <AdminPanel className="p-5 sm:p-7">
        <form onSubmit={(event) => { event.preventDefault(); search(keyword); }} className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="cj-keyword" className="sr-only">Search CJ products</label>
          <input id="cj-keyword" value={keyword} onChange={(event) => setKeyword(event.target.value)} minLength={2} maxLength={100} required placeholder="Search in English, e.g. linen shirt" className={`${fieldStyles} flex-1`} />
          <button type="submit" disabled={loading || busy} className={primaryButtonStyles}><Search className="h-4 w-4" aria-hidden="true" /> {loading ? "Searching..." : "Search CJ"}</button>
        </form>
      </AdminPanel>

      {results ? (
        <section className="mt-6" aria-label="CJ search results">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-black text-slate-950">Results for “{query}”</h2>
            <span className="text-xs font-semibold text-slate-500">Page {page} of {totalPages}</span>
          </div>
          {results.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((item) => (
                <button key={item.pid} type="button" disabled={busy} onClick={() => choose(item.pid)} className="overflow-hidden rounded-2xl border border-stone-200 bg-white text-left transition hover:border-[#ff5331] hover:shadow-md disabled:opacity-60">
                  <div className="grid h-48 place-items-center bg-stone-50">{item.imageUrl?.startsWith("https://") ? <img src={item.imageUrl} alt="" className="h-full w-full object-contain" loading="lazy" /> : <ShoppingBag className="text-stone-300" aria-hidden="true" />}</div>
                  <div className="p-4"><h3 className="line-clamp-2 text-sm font-bold text-slate-900">{item.name}</h3><p className="mt-2 text-xs text-slate-500">CJ supplier price: ${item.supplierPrice} USD</p></div>
                </button>
              ))}
            </div>
          ) : <p className="rounded-2xl bg-white p-8 text-center text-slate-500">No products found. Try another search.</p>}
          <div className="mt-5 flex justify-end gap-3">
            <button type="button" disabled={loading || page <= 1} onClick={() => search(query, page - 1)} className={secondaryButtonStyles}>Previous</button>
            <button type="button" disabled={loading || page >= totalPages} onClick={() => search(query, page + 1)} className={secondaryButtonStyles}>Next <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
          </div>
        </section>
      ) : null}

      {product ? (
        <form onSubmit={importProduct} className="mt-8 space-y-6" aria-label="Review CJ product">
          <AdminPanel className="grid gap-6 p-5 sm:p-7 md:grid-cols-[12rem_1fr]">
            <img src={product.imageUrl} alt={product.name} className="h-52 w-full rounded-xl bg-stone-50 object-contain" />
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#e94727]">Selected from CJ</p>
              <h2 className="text-lg font-black text-slate-950">{product.name}</h2>
              <p className="text-sm text-slate-500">CJ supplier price: ${product.supplierPrice} USD. Confirm your own retail price, shipping costs and availability before publishing.</p>
              {product.alreadyImported ? <p className="text-sm font-bold text-red-700">Already imported to Coral.</p> : null}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-bold text-slate-700">Coral product name
                  <input required maxLength={180} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className={`${fieldStyles} mt-2`} />
                </label>
                <label className="text-sm font-bold text-slate-700">Selling price (USD)
                  <input required type="number" min="0" step="0.01" value={form.basePrice} onChange={(event) => setForm({ ...form, basePrice: event.target.value })} className={`${fieldStyles} mt-2`} />
                </label>
                <label className="text-sm font-bold text-slate-700">Coral category
                  <select required value={form.categoryId} onChange={(event) => setForm({ ...form, categoryId: event.target.value })} className={`${fieldStyles} mt-2`}>
                    <option value="">Select category</option>
                    {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                  </select>
                </label>
                <label className="text-sm font-bold text-slate-700">Description (plain text)
                  <textarea rows={2} maxLength={4000} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className={`${fieldStyles} mt-2 resize-y`} />
                </label>
              </div>
            </div>
          </AdminPanel>

          <AdminPanel className="p-5 sm:p-7">
            <h2 className="text-lg font-black text-slate-950">Choose variants</h2>
            <p className="mt-1 text-sm text-slate-500">Choose up to 30. Map each CJ option to Coral's size and color. Enter only stock you have confirmed.</p>
            <div className="mt-5 space-y-3">
              {product.variants.map((variant) => (
                <div key={variant.vid} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                  <label className="flex cursor-pointer items-start gap-3 text-sm font-bold text-slate-900">
                    <input type="checkbox" checked={Boolean(selected[variant.vid])} onChange={() => toggleVariant(variant)} className="mt-1 h-4 w-4 accent-[#ff5331]" />
                    <span>{variant.optionKey || variant.sku}<span className="mt-1 block text-xs font-normal text-slate-500">SKU {variant.sku} · CJ ${variant.supplierPrice}</span></span>
                  </label>
                  {selected[variant.vid] ? (
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <label className="text-xs font-bold text-slate-700">Coral size
                        <select required value={selected[variant.vid].sizeId} onChange={(event) => updateVariant(variant.vid, "sizeId", event.target.value)} className={`${fieldStyles} mt-1`}>
                          <option value="">Select size</option>
                          {options?.sizes.map((size) => <option key={size.id} value={size.id}>{size.name}</option>)}
                        </select>
                      </label>
                      <label className="text-xs font-bold text-slate-700">Coral color
                        <select required value={selected[variant.vid].colorId} onChange={(event) => updateVariant(variant.vid, "colorId", event.target.value)} className={`${fieldStyles} mt-1`}>
                          <option value="">Select color</option>
                          {options?.colors.map((color) => <option key={color.id} value={color.id}>{color.name}</option>)}
                        </select>
                      </label>
                      <label className="text-xs font-bold text-slate-700">Confirmed stock
                        <input required type="number" min="0" max="2147483647" step="1" value={selected[variant.vid].stock} onChange={(event) => updateVariant(variant.vid, "stock", event.target.value)} className={`${fieldStyles} mt-1`} />
                      </label>
                    </div>
                  ) : null}
                </div>
              ))}
              {!product.variants.length ? <p className="text-sm text-slate-500">CJ provided no variants for this product.</p> : null}
            </div>
          </AdminPanel>

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-5">
            <label className="flex items-center gap-3 text-sm font-bold text-slate-900">
              <input type="checkbox" checked={form.isActive} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} className="h-5 w-5 accent-[#ff5331]" />
              Publish in storefront now
            </label>
            <button type="submit" disabled={busy || !options || product.alreadyImported || !product.variants.length} className={primaryButtonStyles}>
              {busy ? "Importing..." : "Import to Coral"}
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
