import {
  ArrowUpRight,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Link } from "react-router";
import {
  AdminBadge,
  AdminPageHeader,
  AdminPanel,
  EmptyState,
  ErrorState,
} from "../components/admin-ui";
import { formatAdminDate } from "../components/admin-styles";
import { StatsCard } from "../components/stats-card";
import { useStats } from "../hooks/use-stats";

const STAT_SKELETONS = Array.from({ length: 4 }, (_, index) => index);
const ORDER_SKELETONS = Array.from({ length: 4 }, (_, index) => index);

export function Overview() {
  const { stats, loading, error } = useStats();

  if (error) {
    return (
      <ErrorState
        error={error}
        detail="Make sure the backend server is running on localhost:8080."
      />
    );
  }

  const statsData = [
    {
      title: "Total users",
      value: stats?.totalUsers ?? 0,
      icon: Users,
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Products",
      value: stats?.totalProducts ?? 0,
      icon: Package,
      color: "bg-[#fff0eb] text-[#e94727]",
    },
    {
      title: "Orders",
      value: stats?.totalOrders ?? 0,
      icon: ShoppingCart,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Revenue",
      value: `$${(stats?.totalRevenue ?? 0).toLocaleString()}`,
      icon: DollarSign,
      color: "bg-violet-50 text-violet-700",
    },
  ];

  const recentOrders = stats?.recentOrders || [];

  return (
    <div>
      <AdminPageHeader
        eyebrow="Store pulse"
        title="Dashboard"
        description="A clear view of your shop's activity, customers, and latest orders."
        actions={
          <Link
            to="/admin/products/new"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-stone-300 hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331] sm:w-auto"
          >
            Add a product
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      />

      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {loading
          ? STAT_SKELETONS.map((item) => <StatSkeleton key={item} />)
          : statsData.map((stat) => <StatsCard key={stat.title} {...stat} />)}
      </div>

      <AdminPanel>
        <div className="flex items-center justify-between gap-4 border-b border-stone-200/80 px-5 py-5 sm:px-7">
          <div>
            <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#e94727]">
              Live activity
            </p>
            <h2 className="mt-1 text-xl font-black tracking-tight text-slate-950">
              Recent orders
            </h2>
          </div>
          <Link
            to="/admin/orders"
            className="text-sm font-bold text-slate-500 transition hover:text-[#e94727] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331]"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <div className="divide-y divide-stone-100 px-5 sm:px-7">
            {ORDER_SKELETONS.map((item) => (
              <div key={item} className="flex animate-pulse items-center gap-4 py-5">
                <div className="h-10 w-10 rounded-xl bg-stone-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-28 rounded bg-stone-100" />
                  <div className="h-3 w-20 rounded bg-stone-100" />
                </div>
                <div className="h-6 w-20 rounded-full bg-stone-100" />
              </div>
            ))}
          </div>
        ) : recentOrders.length > 0 ? (
          <>
            <div className="divide-y divide-stone-100 md:hidden">
              {recentOrders.map((order) => (
                <article key={order.id} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-black text-slate-950">Order #{order.id}</p>
                      <p className="mt-1 text-sm text-slate-500">{order.username}</p>
                    </div>
                    <AdminBadge value={order.status} />
                  </div>
                  <div className="mt-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total</p>
                      <p className="mt-1 font-black text-slate-900">${order.totalAmount?.toFixed(2)}</p>
                    </div>
                    <time className="text-xs font-semibold text-slate-400">
                      {formatAdminDate(order.createdAt)}
                    </time>
                  </div>
                </article>
              ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left">
                <thead className="bg-stone-50/80">
                  <tr className="text-[0.66rem] font-black uppercase tracking-[0.14em] text-slate-400">
                    <th className="px-7 py-4">Order</th>
                    <th className="px-7 py-4">Customer</th>
                    <th className="px-7 py-4">Total</th>
                    <th className="px-7 py-4">Status</th>
                    <th className="px-7 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="transition-colors hover:bg-[#fffaf7]">
                      <td className="px-7 py-4 text-sm font-black text-slate-900">#{order.id}</td>
                      <td className="px-7 py-4 text-sm font-semibold text-slate-600">{order.username}</td>
                      <td className="px-7 py-4 text-sm font-black text-slate-900">${order.totalAmount?.toFixed(2)}</td>
                      <td className="px-7 py-4"><AdminBadge value={order.status} /></td>
                      <td className="px-7 py-4 text-sm text-slate-500">{formatAdminDate(order.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <EmptyState title="No recent orders" description="New orders will appear here as soon as they arrive." />
        )}
      </AdminPanel>
    </div>
  );
}

function StatSkeleton() {
  return (
    <div className="animate-pulse rounded-[1.35rem] border border-stone-200/80 bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="h-3 w-20 rounded bg-stone-100" />
          <div className="h-8 w-16 rounded bg-stone-100" />
        </div>
        <div className="h-12 w-12 rounded-2xl bg-stone-100" />
      </div>
    </div>
  );
}
