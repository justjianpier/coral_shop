import { Package, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import {
  AdminBadge,
  AdminPageHeader,
  AdminPanel,
  EmptyState,
  ErrorState,
} from "../components/admin-ui";
import { primaryButtonStyles } from "../components/admin-styles";
import { ConfirmModal } from "../components/confirm-modal";
import { useProducts } from "../hooks/use-products";

const SKELETONS = Array.from({ length: 5 }, (_, index) => index);

export function Products() {
  const { products, loading, error, deleteProduct } = useProducts();
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = async () => {
    if (deleteId) {
      await deleteProduct(deleteId);
      setDeleteId(null);
    }
  };

  if (error) return <ErrorState error={error} />;

  return (
    <div>
      <AdminPageHeader
        eyebrow="Catalog"
        title="Products"
        description="Create, organize, and keep your storefront collection up to date."
        actions={
          <Link to="/admin/products/new" className={`${primaryButtonStyles} w-full sm:w-auto`}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add product
          </Link>
        }
      />

      <AdminPanel>
        <div className="flex items-center justify-between border-b border-stone-200/80 px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff0eb] text-[#e94727]">
              <Package className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-black text-slate-900">Product library</h2>
              <p className="text-xs text-slate-400">{products.length} items total</p>
            </div>
          </div>
        </div>

        {loading ? (
          <ProductSkeletons />
        ) : products.length > 0 ? (
          <>
            <div className="divide-y divide-stone-100 md:hidden">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDelete={() => setDeleteId(product.id)}
                />
              ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[52rem] text-left">
                <thead className="bg-stone-50/80">
                  <tr className="text-[0.66rem] font-black uppercase tracking-[0.14em] text-slate-400">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {products.map((product) => (
                    <tr key={product.id} className="transition-colors hover:bg-[#fffaf7]">
                      <td className="px-6 py-4 text-xs font-bold text-slate-400">#{product.id}</td>
                      <td className="max-w-[18rem] px-6 py-4 text-sm font-black text-slate-900">
                        <span className="block truncate">{product.name}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-black text-slate-900">${product.basePrice?.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-500">{product.categoryName || "Uncategorized"}</td>
                      <td className="px-6 py-4">
                        <AdminBadge value={product.isActive ? "ACTIVE" : "INACTIVE"} label={product.isActive ? "Active" : "Inactive"} />
                      </td>
                      <td className="px-6 py-4">
                        <ProductActions product={product} onDelete={() => setDeleteId(product.id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <EmptyState title="No products yet" description="Add your first product to begin building the catalog." />
        )}
      </AdminPanel>

      {deleteId ? (
        <ConfirmModal
          title="Delete product"
          message="Are you sure you want to delete this product? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      ) : null}
    </div>
  );
}

function ProductCard({ product, onDelete }) {
  return (
    <article className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-400">#{product.id}</p>
          <h2 className="mt-1 truncate font-black text-slate-950">{product.name}</h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">{product.categoryName || "Uncategorized"}</p>
        </div>
        <AdminBadge value={product.isActive ? "ACTIVE" : "INACTIVE"} label={product.isActive ? "Active" : "Inactive"} />
      </div>
      <div className="mt-5 flex items-center justify-between gap-4 border-t border-stone-100 pt-4">
        <p className="text-lg font-black text-slate-950">${product.basePrice?.toFixed(2)}</p>
        <ProductActions product={product} onDelete={onDelete} />
      </div>
    </article>
  );
}

function ProductActions({ product, onDelete }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        to={`/admin/products/${product.id}/edit`}
        className="grid h-10 w-10 place-items-center rounded-xl border border-stone-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        aria-label={`Edit ${product.name}`}
      >
        <Pencil className="h-4 w-4" aria-hidden="true" />
      </Link>
      <button
        type="button"
        onClick={onDelete}
        className="grid h-10 w-10 place-items-center rounded-xl border border-stone-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        aria-label={`Delete ${product.name}`}
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

function ProductSkeletons() {
  return (
    <div className="divide-y divide-stone-100 px-5 sm:px-7">
      {SKELETONS.map((item) => (
        <div key={item} className="flex animate-pulse items-center gap-4 py-5">
          <div className="h-10 w-10 rounded-xl bg-stone-100" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-40 max-w-full rounded bg-stone-100" />
            <div className="h-3 w-24 rounded bg-stone-100" />
          </div>
          <div className="h-8 w-16 rounded-xl bg-stone-100" />
        </div>
      ))}
    </div>
  );
}
