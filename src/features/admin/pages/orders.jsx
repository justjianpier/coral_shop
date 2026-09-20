import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import {
  AdminBadge,
  AdminPageHeader,
  AdminPanel,
  EmptyState,
  ErrorState,
} from "../components/admin-ui";
import { formatAdminDate, selectStyles } from "../components/admin-styles";
import { useOrders } from "../hooks/use-orders";

const STATUSES = ["ALL", "PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];
const SKELETONS = Array.from({ length: 5 }, (_, index) => index);

export function Orders() {
  const { orders, loading, error, updateStatus } = useOrders();
  const [filter, setFilter] = useState("ALL");
  const filteredOrders = filter === "ALL" ? orders : orders.filter((order) => order.status === filter);

  if (error) return <ErrorState error={error} />;

  return (
    <div>
      <AdminPageHeader
        eyebrow="Fulfillment"
        title="Orders"
        description="Follow every order from checkout to delivery and keep customers informed."
      />

      <AdminPanel>
        <div className="border-b border-stone-200/80 px-5 py-5 sm:px-7">
          <div className="mb-4 flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-[#e94727]" aria-hidden="true" />
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Filter orders</p>
          </div>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" aria-label="Order status filter">
            {STATUSES.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilter(status)}
                className={`min-h-10 shrink-0 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331] ${
                  filter === status
                    ? "bg-slate-950 text-white shadow-lg shadow-slate-950/10"
                    : "border border-stone-200 bg-white text-slate-500 hover:bg-stone-50 hover:text-slate-900"
                }`}
                aria-pressed={filter === status}
              >
                {status === "ALL" ? `All (${orders.length})` : status}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <OrderSkeletons />
        ) : filteredOrders.length > 0 ? (
          <>
            <div className="divide-y divide-stone-100 lg:hidden">
              {filteredOrders.map((order) => (
                <article key={order.id} className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-black text-slate-950">Order #{order.id}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-500">{order.username}</p>
                    </div>
                    <AdminBadge value={order.status} />
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-4 rounded-2xl bg-stone-50 p-4">
                    <div>
                      <p className="text-[0.65rem] font-black uppercase tracking-wider text-slate-400">Total</p>
                      <p className="mt-1 font-black text-slate-900">${order.totalAmount?.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-[0.65rem] font-black uppercase tracking-wider text-slate-400">Placed</p>
                      <p className="mt-1 text-sm font-bold text-slate-600">{formatAdminDate(order.createdAt)}</p>
                    </div>
                  </div>
                  <label className="mt-4 block text-xs font-black uppercase tracking-wider text-slate-400" htmlFor={`order-${order.id}-status`}>
                    Update status
                  </label>
                  <select
                    id={`order-${order.id}-status`}
                    value={order.status}
                    onChange={(event) => updateStatus(order.id, event.target.value)}
                    className={`${selectStyles} mt-2 w-full`}
                  >
                    <StatusOptions />
                  </select>
                </article>
              ))}
            </div>

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[58rem] text-left">
                <thead className="bg-stone-50/80">
                  <tr className="text-[0.66rem] font-black uppercase tracking-[0.14em] text-slate-400">
                    <th className="px-6 py-4">Order</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="transition-colors hover:bg-[#fffaf7]">
                      <td className="px-6 py-4 text-sm font-black text-slate-900">#{order.id}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-600">{order.username}</td>
                      <td className="px-6 py-4 text-sm font-black text-slate-900">${order.totalAmount?.toFixed(2)}</td>
                      <td className="px-6 py-4"><AdminBadge value={order.status} /></td>
                      <td className="px-6 py-4 text-sm text-slate-500">{formatAdminDate(order.createdAt)}</td>
                      <td className="px-6 py-4 text-right">
                        <label className="sr-only" htmlFor={`desktop-order-${order.id}-status`}>Update order {order.id} status</label>
                        <select
                          id={`desktop-order-${order.id}-status`}
                          value={order.status}
                          onChange={(event) => updateStatus(order.id, event.target.value)}
                          className={selectStyles}
                        >
                          <StatusOptions />
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <EmptyState title="No matching orders" description="Try another status filter or check back when new orders arrive." />
        )}
      </AdminPanel>
    </div>
  );
}

function StatusOptions() {
  return (
    <>
      <option value="PENDING">Pending</option>
      <option value="SHIPPED">Shipped</option>
      <option value="DELIVERED">Delivered</option>
      <option value="CANCELLED">Cancelled</option>
    </>
  );
}

function OrderSkeletons() {
  return (
    <div className="divide-y divide-stone-100 px-5 sm:px-7">
      {SKELETONS.map((item) => (
        <div key={item} className="flex animate-pulse items-center gap-4 py-5">
          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-stone-100" />
            <div className="h-3 w-16 rounded bg-stone-100" />
          </div>
          <div className="ml-auto h-7 w-20 rounded-full bg-stone-100" />
        </div>
      ))}
    </div>
  );
}
