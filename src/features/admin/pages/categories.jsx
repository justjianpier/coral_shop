import { Check, Pencil, Plus, Tag, Trash2, X } from "lucide-react";
import { useState } from "react";
import {
  AdminPageHeader,
  AdminPanel,
  EmptyState,
  ErrorState,
} from "../components/admin-ui";
import {
  fieldStyles,
  primaryButtonStyles,
  secondaryButtonStyles,
} from "../components/admin-styles";
import { ConfirmModal } from "../components/confirm-modal";
import { useCategories } from "../hooks/use-categories";

const EMPTY_FORM = { name: "", description: "" };
const SKELETONS = Array.from({ length: 5 }, (_, index) => index);

export function Categories() {
  const {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await updateCategory(editId, formData);
      } else {
        await createCategory(formData);
      }
      resetForm();
    } catch (submitError) {
      console.error(submitError);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (category) => {
    setEditId(category.id);
    setFormData({ name: category.name, description: category.description || "" });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteCategory(deleteId);
      setDeleteId(null);
    }
  };

  if (error) return <ErrorState error={error} />;

  return (
    <div>
      <AdminPageHeader
        eyebrow="Catalog structure"
        title="Categories"
        description="Shape how customers browse and discover products across your store."
        actions={
          <button
            type="button"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className={`${primaryButtonStyles} w-full sm:w-auto`}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add category
          </button>
        }
      />

      {showForm ? (
        <AdminPanel className="mb-6 border-[#ff5331]/15">
          <div className="flex items-start justify-between gap-4 border-b border-stone-200/80 px-5 py-5 sm:px-7">
            <div>
              <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#e94727]">
                {editId ? "Editing category" : "New category"}
              </p>
              <h2 className="mt-1 text-xl font-black tracking-tight text-slate-950">
                {editId ? "Update category details" : "Create a browsing group"}
              </h2>
            </div>
            <button
              type="button"
              onClick={resetForm}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-stone-200 text-slate-500 transition hover:bg-stone-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331]"
              aria-label="Close category form"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 sm:p-7">
            <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <label htmlFor="category-name" className="text-sm font-bold text-slate-700">Name</label>
                <input
                  id="category-name"
                  type="text"
                  value={formData.name}
                  onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                  required
                  className={`${fieldStyles} mt-2`}
                  placeholder="e.g. Fine jewelry"
                />
              </div>
              <div>
                <label htmlFor="category-description" className="text-sm font-bold text-slate-700">Description</label>
                <textarea
                  id="category-description"
                  value={formData.description}
                  onChange={(event) => setFormData((current) => ({ ...current, description: event.target.value }))}
                  rows={3}
                  className={`${fieldStyles} mt-2 resize-none`}
                  placeholder="A short description for your team"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={resetForm} className={secondaryButtonStyles}>Cancel</button>
              <button type="submit" disabled={saving} className={primaryButtonStyles}>
                <Check className="h-4 w-4" aria-hidden="true" />
                {saving ? "Saving..." : editId ? "Update category" : "Create category"}
              </button>
            </div>
          </form>
        </AdminPanel>
      ) : null}

      <AdminPanel>
        <div className="flex items-center justify-between border-b border-stone-200/80 px-5 py-5 sm:px-7">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff0eb] text-[#e94727]">
              <Tag className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-black text-slate-900">Category library</h2>
              <p className="text-xs text-slate-400">{categories.length} groups total</p>
            </div>
          </div>
        </div>

        {loading ? (
          <CategorySkeletons />
        ) : categories.length > 0 ? (
          <>
            <div className="divide-y divide-stone-100 md:hidden">
              {categories.map((category) => (
                <article key={category.id} className="p-5">
                  <p className="text-xs font-bold text-slate-400">#{category.id}</p>
                  <h2 className="mt-1 font-black text-slate-950">{category.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{category.description || "No description provided."}</p>
                  <CategoryActions category={category} onEdit={() => handleEdit(category)} onDelete={() => setDeleteId(category.id)} />
                </article>
              ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[44rem] text-left">
                <thead className="bg-stone-50/80">
                  <tr className="text-[0.66rem] font-black uppercase tracking-[0.14em] text-slate-400">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {categories.map((category) => (
                    <tr key={category.id} className="transition-colors hover:bg-[#fffaf7]">
                      <td className="px-6 py-4 text-xs font-bold text-slate-400">#{category.id}</td>
                      <td className="px-6 py-4 text-sm font-black text-slate-900">{category.name}</td>
                      <td className="max-w-[26rem] px-6 py-4 text-sm text-slate-500">
                        <span className="block truncate">{category.description || "No description"}</span>
                      </td>
                      <td className="px-6 py-4">
                        <CategoryActions category={category} onEdit={() => handleEdit(category)} onDelete={() => setDeleteId(category.id)} compact />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <EmptyState title="No categories yet" description="Create a category to organize your growing catalog." />
        )}
      </AdminPanel>

      {deleteId ? (
        <ConfirmModal
          title="Delete category"
          message="Are you sure you want to delete this category? Products assigned to it may be affected."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      ) : null}
    </div>
  );
}

function CategoryActions({ category, onEdit, onDelete, compact = false }) {
  return (
    <div className={`flex items-center gap-2 ${compact ? "justify-end" : "mt-5 border-t border-stone-100 pt-4"}`}>
      <button
        type="button"
        onClick={onEdit}
        className={`${compact ? "grid h-10 w-10 place-items-center px-0" : "inline-flex min-h-10 flex-1 items-center justify-center gap-2 px-3"} rounded-xl border border-stone-200 text-sm font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
        aria-label={compact ? `Edit ${category.name}` : undefined}
      >
        <Pencil className="h-4 w-4" aria-hidden="true" />
        {compact ? null : "Edit"}
      </button>
      <button
        type="button"
        onClick={onDelete}
        className={`${compact ? "grid h-10 w-10 place-items-center px-0" : "inline-flex min-h-10 flex-1 items-center justify-center gap-2 px-3"} rounded-xl border border-stone-200 text-sm font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600`}
        aria-label={compact ? `Delete ${category.name}` : undefined}
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
        {compact ? null : "Delete"}
      </button>
    </div>
  );
}

function CategorySkeletons() {
  return (
    <div className="divide-y divide-stone-100 px-5 sm:px-7">
      {SKELETONS.map((item) => (
        <div key={item} className="flex animate-pulse items-center gap-4 py-5">
          <div className="h-10 w-10 rounded-xl bg-stone-100" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-28 rounded bg-stone-100" />
            <div className="h-3 w-48 max-w-full rounded bg-stone-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
