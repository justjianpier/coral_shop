import { ArrowLeft, Image, PackagePlus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AdminPageHeader, AdminPanel, ErrorState } from "../components/admin-ui";
import { fieldStyles, primaryButtonStyles, secondaryButtonStyles } from "../components/admin-styles";
import { useCategories } from "../hooks/use-categories";
import { productsService } from "../services/products-service";

const newVariant = (key) => ({ key, sizeId: "", colorId: "", sku: "", stock: "0" });

export function ProductForm() {
  const navigate = useNavigate();
  const { categories, loading: loadingCategories, error: categoriesError } = useCategories();
  const [options, setOptions] = useState(null);
  const [optionsError, setOptionsError] = useState("");
  const [form, setForm] = useState({
    name: "", description: "", basePrice: "", categoryId: "", imageUrl: "", isActive: true,
  });
  const [variants, setVariants] = useState([newVariant(1)]);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    let cancelled = false;
    productsService.getOptions()
      .then((data) => { if (!cancelled) setOptions(data); })
      .catch((error) => { if (!cancelled) setOptionsError(error.message); });
    return () => { cancelled = true; };
  }, []);

  function updateVariant(key, field, value) {
    setVariants((current) => current.map((item) => item.key === key ? { ...item, [field]: value } : item));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (saving) return;
    const combos = variants.map((variant) => `${variant.sizeId}:${variant.colorId}`);
    const skus = variants.map((variant) => variant.sku.trim());
    if (new Set(combos).size !== combos.length || new Set(skus).size !== skus.length) {
      setSubmitError("Each size/color combination and SKU must be unique.");
      return;
    }
    setSaving(true);
    setSubmitError("");
    try {
      await productsService.create({
        ...form,
        name: form.name.trim(),
        imageUrl: form.imageUrl.trim(),
        basePrice: Number(form.basePrice),
        categoryId: Number(form.categoryId),
        variants: variants.map(({ sizeId, colorId, sku, stock }) => ({
          sizeId: Number(sizeId), colorId: Number(colorId), sku: sku.trim(), stock: Number(stock),
        })),
      });
      navigate("/admin/products", { replace: true });
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSaving(false);
    }
  }

  if (categoriesError || optionsError) return <ErrorState error={categoriesError || optionsError} />;

  return (
    <div className="mx-auto max-w-5xl">
      <Link to="/admin/products" className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#e94727]">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to products
      </Link>
      <AdminPageHeader eyebrow="Catalog · New item" title="Create product" description="Add a garment with a photo, price, and at least one size/color variant." />

      {submitError ? <p role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{submitError}</p> : null}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <AdminPanel className="space-y-5 p-5 sm:p-7">
            <h2 className="flex items-center gap-3 text-lg font-black text-slate-950"><PackagePlus className="h-5 w-5 text-[#e94727]" aria-hidden="true" /> Product details</h2>
            <Field id="product-name" label="Product name">
              <input id="product-name" required maxLength={180} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className={`${fieldStyles} mt-2`} placeholder="e.g. Linen shirt" />
            </Field>
            <Field id="product-description" label="Description" required={false}>
              <textarea id="product-description" rows={4} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className={`${fieldStyles} mt-2 resize-y`} placeholder="Materials, fit and care details" />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="product-price" label="Price ($)">
                <input id="product-price" required type="number" min="0" max="9999999999.99" step="0.01" value={form.basePrice} onChange={(event) => setForm({ ...form, basePrice: event.target.value })} className={`${fieldStyles} mt-2`} />
              </Field>
              <Field id="product-category" label="Category">
                <select id="product-category" required value={form.categoryId} onChange={(event) => setForm({ ...form, categoryId: event.target.value })} className={`${fieldStyles} mt-2`}>
                  <option value="">Select category</option>
                  {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
              </Field>
            </div>
          </AdminPanel>

          <div className="space-y-5">
            <AdminPanel className="space-y-4 p-5 sm:p-6">
              <h2 className="flex items-center gap-2 font-black text-slate-950"><Image className="h-5 w-5 text-[#e94727]" aria-hidden="true" /> Product image</h2>
              <Field id="product-image" label="Image URL">
                <input id="product-image" type="url" required pattern="https?://.+" value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} className={`${fieldStyles} mt-2`} placeholder="https://example.com/shirt.jpg" />
              </Field>
              <p className="text-xs leading-5 text-slate-500">Paste a public HTTPS image URL. File uploads are not available yet.</p>
              {form.imageUrl.startsWith("https://") || form.imageUrl.startsWith("http://") ? (
                <img src={form.imageUrl} alt="Product preview" className="h-40 w-full rounded-xl bg-stone-50 object-contain" />
              ) : null}
            </AdminPanel>
            <AdminPanel className="p-5 sm:p-6">
              <label htmlFor="product-active" className="flex items-center gap-3 text-sm font-bold text-slate-900">
                <input id="product-active" type="checkbox" checked={form.isActive} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} className="h-5 w-5 accent-[#ff5331]" />
                Visible in the storefront
              </label>
              <p className="mt-2 text-xs text-slate-500">Uncheck to save without publishing.</p>
            </AdminPanel>
          </div>
        </div>

        <AdminPanel className="p-5 sm:p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-950">Sizes, colors & stock</h2>
              <p className="text-sm text-slate-500">Add one row per size and color. SKU must be unique across the catalog.</p>
            </div>
            <button type="button" onClick={() => setVariants((current) => [...current, newVariant(Math.max(...current.map((item) => item.key)) + 1)])} className={secondaryButtonStyles}>
              <Plus className="h-4 w-4" aria-hidden="true" /> Add variant
            </button>
          </div>
          <div className="space-y-4">
            {variants.map((variant, index) => (
              <div key={variant.key} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-700">Variant {index + 1}</h3>
                  <button type="button" disabled={variants.length === 1} onClick={() => setVariants((current) => current.filter((item) => item.key !== variant.key))} aria-label={`Remove variant ${index + 1}`} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-40"><Trash2 className="h-4 w-4" aria-hidden="true" /></button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Field id={`size-${variant.key}`} label="Size">
                    <select id={`size-${variant.key}`} required value={variant.sizeId} onChange={(event) => updateVariant(variant.key, "sizeId", event.target.value)} className={`${fieldStyles} mt-2`}>
                      <option value="">Select size</option>
                      {options?.sizes.map((size) => <option key={size.id} value={size.id}>{size.name}</option>)}
                    </select>
                  </Field>
                  <Field id={`color-${variant.key}`} label="Color">
                    <select id={`color-${variant.key}`} required value={variant.colorId} onChange={(event) => updateVariant(variant.key, "colorId", event.target.value)} className={`${fieldStyles} mt-2`}>
                      <option value="">Select color</option>
                      {options?.colors.map((color) => <option key={color.id} value={color.id}>{color.name}</option>)}
                    </select>
                  </Field>
                  <Field id={`sku-${variant.key}`} label="SKU">
                    <input id={`sku-${variant.key}`} required maxLength={80} value={variant.sku} onChange={(event) => updateVariant(variant.key, "sku", event.target.value)} className={`${fieldStyles} mt-2`} placeholder="SHIRT-BLK-M" />
                  </Field>
                  <Field id={`stock-${variant.key}`} label="Stock">
                    <input id={`stock-${variant.key}`} required type="number" min="0" max="2147483647" step="1" value={variant.stock} onChange={(event) => updateVariant(variant.key, "stock", event.target.value)} className={`${fieldStyles} mt-2`} />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        </AdminPanel>

        <div className="flex flex-col-reverse gap-3 rounded-2xl border border-stone-200 bg-white p-5 sm:flex-row sm:justify-end">
          <Link to="/admin/products" className={secondaryButtonStyles}>Cancel</Link>
          <button type="submit" disabled={saving || loadingCategories || !options || categories.length === 0} className={primaryButtonStyles}>
            {saving ? "Saving..." : "Create product"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ id, label, required = true, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-slate-700">
        {label}{required ? <span className="ml-1 text-[#e94727]">*</span> : null}
      </label>
      {children}
    </div>
  );
}
