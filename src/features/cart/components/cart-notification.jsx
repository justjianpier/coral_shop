import { CheckCircle2, XCircle } from "lucide-react";
import { useCart } from "../hooks/use-cart";

export function CartNotification() {
  const { notification } = useCart();

  if (!notification) return null;

  const isSuccess = notification.type === "success";
  const Icon = isSuccess ? CheckCircle2 : XCircle;

  return (
    <div
      key={notification.id}
      className={`cart-notification fixed right-4 top-4 z-[100] flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-xl px-5 py-4 text-white shadow-xl sm:max-w-sm ${
        isSuccess ? "bg-emerald-600" : "bg-red-600"
      }`}
      role="status"
      aria-live="polite"
    >
      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
      <p className="text-sm font-semibold">{notification.message}</p>
    </div>
  );
}
