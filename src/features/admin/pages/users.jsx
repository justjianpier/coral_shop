import { ShieldCheck, UserRound } from "lucide-react";
import {
  AdminBadge,
  AdminPageHeader,
  AdminPanel,
  EmptyState,
  ErrorState,
} from "../components/admin-ui";
import { formatAdminDate, selectStyles } from "../components/admin-styles";
import { useUsers } from "../hooks/use-users";

const SKELETONS = Array.from({ length: 5 }, (_, index) => index);

export function Users() {
  const { users, loading, error, updateRole } = useUsers();

  if (error) return <ErrorState error={error} />;

  return (
    <div>
      <AdminPageHeader
        eyebrow="Community"
        title="Users"
        description="Review customer accounts and manage access to the admin workspace."
        actions={
          <div className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 text-sm font-bold text-slate-600 shadow-sm sm:w-auto">
            <UserRound className="h-4 w-4 text-[#e94727]" aria-hidden="true" />
            {users.length} total
          </div>
        }
      />

      <AdminPanel>
        <div className="flex items-center gap-3 border-b border-stone-200/80 px-5 py-5 sm:px-7">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-700">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-black text-slate-900">Account access</h2>
            <p className="text-xs text-slate-400">Assign roles carefully to protect your store.</p>
          </div>
        </div>

        {loading ? (
          <UserSkeletons />
        ) : users.length > 0 ? (
          <>
            <div className="divide-y divide-stone-100 lg:hidden">
              {users.map((user) => (
                <article key={user.id} className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate font-black text-slate-950">{user.username}</p>
                      <p className="mt-1 truncate text-sm text-slate-500">{user.email}</p>
                    </div>
                    <RoleBadge role={user.roleName} />
                  </div>
                  <div className="mt-5 flex items-end gap-4">
                    <div className="flex-1">
                      <p className="text-[0.65rem] font-black uppercase tracking-wider text-slate-400">Joined</p>
                      <p className="mt-1 text-sm font-bold text-slate-600">{formatAdminDate(user.createdAt)}</p>
                    </div>
                    <div>
                      <label className="sr-only" htmlFor={`user-${user.id}-role`}>Update {user.username}'s role</label>
                      <select
                        id={`user-${user.id}-role`}
                        value={user.roleId}
                        onChange={(event) => updateRole(user.id, Number(event.target.value))}
                        className={selectStyles}
                      >
                        <RoleOptions />
                      </select>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[58rem] text-left">
                <thead className="bg-stone-50/80">
                  <tr className="text-[0.66rem] font-black uppercase tracking-[0.14em] text-slate-400">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Joined</th>
                    <th className="px-6 py-4 text-right">Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {users.map((user) => (
                    <tr key={user.id} className="transition-colors hover:bg-[#fffaf7]">
                      <td className="px-6 py-4 text-xs font-bold text-slate-400">#{user.id}</td>
                      <td className="px-6 py-4 text-sm font-black text-slate-900">{user.username}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{user.email}</td>
                      <td className="px-6 py-4"><RoleBadge role={user.roleName} /></td>
                      <td className="px-6 py-4 text-sm text-slate-500">{formatAdminDate(user.createdAt)}</td>
                      <td className="px-6 py-4 text-right">
                        <label className="sr-only" htmlFor={`desktop-user-${user.id}-role`}>Update {user.username}'s role</label>
                        <select
                          id={`desktop-user-${user.id}-role`}
                          value={user.roleId}
                          onChange={(event) => updateRole(user.id, Number(event.target.value))}
                          className={selectStyles}
                        >
                          <RoleOptions />
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <EmptyState title="No users found" description="Registered customer accounts will appear here." />
        )}
      </AdminPanel>
    </div>
  );
}

function RoleBadge({ role }) {
  const isAdmin = role === "ROLE_ADMIN";
  return <AdminBadge value={isAdmin ? "ADMIN" : "USER"} label={isAdmin ? "Admin" : "User"} />;
}

function RoleOptions() {
  return (
    <>
      <option value={1}>Admin</option>
      <option value={2}>User</option>
    </>
  );
}

function UserSkeletons() {
  return (
    <div className="divide-y divide-stone-100 px-5 sm:px-7">
      {SKELETONS.map((item) => (
        <div key={item} className="flex animate-pulse items-center gap-4 py-5">
          <div className="h-10 w-10 rounded-full bg-stone-100" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-28 rounded bg-stone-100" />
            <div className="h-3 w-40 max-w-full rounded bg-stone-100" />
          </div>
          <div className="h-7 w-16 rounded-full bg-stone-100" />
        </div>
      ))}
    </div>
  );
}
