import { ArrowLeft, Check, PackagePlus, Save, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  AdminPageHeader,
  AdminPanel,
  ErrorState,
} from "../components/admin-ui";
import {
  fieldStyles,
  primaryButtonStyles,
  secondaryButtonStyles,
} from "../components/admin-styles";
import { useCategories } from "../hooks/use-categories";
import { useProduct } from "../hooks/use-products";
import { productsService } from "../services/products-service";

function getInitialFormData(product) {
  return {
    name: product?.name || "",
    description: product?.description || "",
    basePrice: product?.basePrice || "",
    categoryId: product?.categoryId || "",
    isActive: product?.isActive ?? true,
  };
}

export function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { product, loading: loadingProduct, error: productError } = useProduct(id);
  const { categories, error: categoriesError } = useCategories();

  const [formData, setFormData] = useState(() => getInitialFormData(null));
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [prevProduct, setPrevProduct] = useState(null);

  if (product && product !== prevProduct) {
    setPrevProduct(product);
    setFormData(getInitialFormData(product));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setSubmitError(null);

    try {
      const payload = {
        ...formData,
        basePrice: parseFloat(formData.basePrice),
        categoryId: formData.categoryId ? Number(formData.categoryId) : null,
      };

      if (isEdit) {
        await productsService.update(id, payload);
      } else {
        await productsService.create(payload);
      }
      navigate("/admin/products");
    } catch (requestError) {
      setSubmitError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  if (productError || categoriesError) {
    return <ErrorState error={productError || categoriesError} />;
  }

  if (isEdit && loadingProduct) return <ProductFormSkeleton />;

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/admin/products"
        className="mb-5 inline-flex items-center gap-2 rounded-lg text-sm font-bold text-slate-500 transition hover:text-[#e94727] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to products
      </Link>

      <AdminPageHeader
        eyebrow={isEdit ? "Catalog · Editing" : "Catalog · New item"}
        title={isEdit ? "Edit product" : "Create product"}
        description={isEdit ? "Refine the product information customers see in your storefront." : "Add a new piece to your catalog with clear details and pricing."}
      />

      {submitError ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700" role="alert">
          {submitError}
        </div>
      ) : null}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <AdminPanel className="p-5 sm:p-7">
            <div className="mb-7 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#fff0eb] text-[#e94727]">
                <PackagePlus className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-black text-slate-950">Product details</h2>
                <p className="text-xs text-slate-400">Fields marked required must be completed.</p>
              </div>
            </div>

            <div className="space-y-5">
              <FormField id="product-name" label="Product name" required>
                <input
                  id="product-name"
                  type="text"
                  value={formData.name}
                  onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                  required
                  className={`${fieldStyles} mt-2`}
                  placeholder="e.g. Handcrafted coral necklace"
                />
              </FormField>

              <FormField id="product-description" label="Description">
                <textarea
                  id="product-description"
                  value={formData.description}
                  onChange={(event) => setFormData((current) => ({ ...current, description: event.target.value }))}
                  rows={6}
                  className={`${fieldStyles} mt-2 resize-y`}
                  placeholder="Describe the materials, details, and story behind this product."
                />
              </FormField>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField id="product-price" label="Base price" required>
                  <div className="relative mt-2">
                    <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm font-bold text-slate-400">$</span>
                    <input
                      id="product-price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.basePrice}
                      onChange={(event) => setFormData((current) => ({ ...current, basePrice: event.target.value }))}
                      required
                      className={`${fieldStyles} pl-8`}
                      placeholder="0.00"
                    />
                  </div>
                </FormField>

                <FormField id="product-category" label="Category">
                  <select
                    id="product-category"
                    value={formData.categoryId}
                    onChange={(event) => setFormData((current) => ({ ...current, categoryId: event.target.value }))}
                    className={`${fieldStyles} mt-2 bg-stone-50`}
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </FormField>
              </div>
            </div>
          </AdminPanel>

          <div className="space-y-5">
            <AdminPanel className="p-5 sm:p-6">
              <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#e94727]">Visibility</p>
              <label htmlFor="product-active" className="mt-4 flex cursor-pointer items-start gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4 transition hover:border-stone-300">
                <input
                  id="product-active"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(event) => setFormData((current) => ({ ...current, isActive: event.target.checked }))}
                  className="mt-0.5 h-5 w-5 rounded border-stone-300 accent-[#ff5331] focus:ring-[#ff5331]"
                />
                <span>
                  <span className="block text-sm font-black text-slate-900">Active product</span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">Available to customers in the storefront.</span>
                </span>
              </label>
            </AdminPanel>

            <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white sm:p-6">
              <Sparkles className="h-5 w-5 text-[#ff7354]" aria-hidden="true" />
              <p className="mt-4 font-black">Ready to publish?</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">Review the name, price, category, and visibility before saving.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 rounded-[1.5rem] border border-stone-200/80 bg-white p-4 sm:flex-row sm:justify-end sm:p-5">
          <button type="button" onClick={() => navigate("/admin/products")} className={secondaryButtonStyles}>
            Cancel
          </button>
          <button type="submit" disabled={saving} className={primaryButtonStyles}>
            {saving ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" aria-hidden="true" /> : isEdit ? <Save className="h-4 w-4" aria-hidden="true" /> : <Check className="h-4 w-4" aria-hidden="true" />}
            {saving ? "Saving..." : isEdit ? "Save changes" : "Create product"}
          </button>
        </div>
      </form>
    </div>
  );
}

function FormField({ id, label, required = false, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-slate-700">
        {label}{required ? <span className="ml-1 text-[#e94727]" aria-hidden="true">*</span> : null}
      </label>
      {children}
    </div>
  );
}

function ProductFormSkeleton() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse space-y-6">
      <div className="h-4 w-32 rounded bg-stone-200" />
      <div className="space-y-3">
        <div className="h-4 w-24 rounded bg-stone-200" />
        <div className="h-10 w-56 rounded bg-stone-200" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="h-[30rem] rounded-[1.5rem] bg-white" />
        <div className="h-48 rounded-[1.5rem] bg-white" />
      </div>
    </div>
  );
}
