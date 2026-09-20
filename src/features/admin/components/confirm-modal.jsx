import { AlertTriangle } from "lucide-react";
import { useEffect, useRef } from "react";
import { secondaryButtonStyles } from "./admin-styles";

export function ConfirmModal({ title, message, onConfirm, onCancel }) {
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    const previousActiveElement = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cancelButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onCancel();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/55 p-3 backdrop-blur-sm sm:items-center sm:p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <div
        className="cart-sheet w-full max-w-md rounded-[1.75rem] border border-white/60 bg-white p-6 shadow-2xl sm:p-7"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-description"
      >
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-red-600">
          <AlertTriangle className="h-5 w-5" aria-hidden="true" />
        </span>
        <h2 id="confirm-modal-title" className="mt-5 text-xl font-black tracking-tight text-slate-950">
          {title}
        </h2>
        <p id="confirm-modal-description" className="mt-2 text-sm leading-6 text-slate-500">
          {message}
        </p>
        <div className="mt-7 grid grid-cols-2 gap-3">
          <button ref={cancelButtonRef} type="button" onClick={onCancel} className={secondaryButtonStyles}>
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
