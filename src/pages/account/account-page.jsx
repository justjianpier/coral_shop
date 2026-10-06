import { ArrowLeft, Heart, LogOut, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../../features/auth/hooks/use-auth";

export function AccountPage() {
  const { account, checking, error: sessionError, signOut } = useAuth();
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (checking) {
    return <main className="grid min-h-[60vh] place-items-center text-slate-600" role="status">Loading your account...</main>;
  }
  if (sessionError) {
    return <main className="grid min-h-[60vh] place-items-center px-6 text-center text-red-700" role="alert">{sessionError}</main>;
  }
  if (!account) return <Navigate to="/login" state={{ from: "/account" }} replace />;
  if (account.role === "ROLE_ADMIN") return <Navigate to="/admin" replace />;

  async function handleSignOut() {
    setSigningOut(true);
    setError("");
    try {
      await signOut();
      navigate("/", { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <main className="min-h-[70vh] bg-[#faf8f4] px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#e94727]">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to the store
        </Link>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e94727]">Your space</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">Hello, {account.username}</h1>
            <p className="mt-2 text-slate-600">Your account details and saved pieces, all in one place.</p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-[#ff623f] hover:text-[#e94727] disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>

        {error ? <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

        <div className="mt-9 grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm" aria-labelledby="account-details-title">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff0eb] text-[#e94727]">
                <UserRound className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 id="account-details-title" className="text-xl font-semibold text-slate-950">Account details</h2>
            </div>
            <dl className="space-y-5">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Username</dt>
                <dd className="mt-1 font-medium text-slate-900">{account.username}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" /> Email
                </dt>
                <dd className="mt-1 break-all font-medium text-slate-900">{account.email}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm" aria-labelledby="favorites-title">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff0eb] text-[#e94727]">
                <Heart className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 id="favorites-title" className="text-xl font-semibold text-slate-950">Favorites</h2>
            </div>
            <p className="text-sm leading-6 text-slate-600">
              Saving favorite products is coming next. Nothing is stored here yet.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
