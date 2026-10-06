import { ArrowLeft, ArrowRight, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { registerUser } from "../../features/auth/api/auth-api";

const inputStyles =
  "block w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 pl-11 text-slate-900 outline-none transition focus:border-[#ff623f] focus:bg-white focus:ring-2 focus:ring-[#ff623f]/15";

export function RegisterPage() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [registeredUser, setRegisteredUser] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (saving) return;

    const form = new FormData(event.currentTarget);
    setSaving(true);
    setError("");

    try {
      const user = await registerUser({
        username: form.get("username").trim(),
        email: form.get("email").trim(),
        password: form.get("password"),
      });
      setRegisteredUser(user);
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? "We couldn't reach the server. Please check that the backend is running."
          : requestError.message,
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-rose-50 via-orange-50 to-rose-50 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-stone-100 bg-white p-7 shadow-xl shadow-orange-950/5 sm:p-9">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded text-sm font-semibold text-slate-500 hover:text-[#e94727] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff623f]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to store
        </Link>

        {registeredUser ? (
          <div className="pt-10" role="status">
            <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#e94727]">
              Account created
            </span>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">
              Welcome to Coral, {registeredUser.username}.
            </h1>
            <p className="mt-4 leading-7 text-slate-600">
              Your account has been saved. Sign in to access your account.
            </p>
            <Link
              to="/login"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff623f] px-5 py-3 font-semibold text-white transition hover:bg-[#e94727] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff623f]"
            >
              Sign in <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8 mt-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e94727]">
                Join the collection
              </span>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                Create your account
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                One small step toward the pieces you love.
              </p>
            </div>

            {error ? (
              <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="register-username" className="mb-2 block text-sm font-semibold text-slate-700">
                  Username
                </label>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input id="register-username" name="username" type="text" autoComplete="username" minLength={3} maxLength={80} required className={inputStyles} placeholder="Your username" />
                </div>
              </div>

              <div>
                <label htmlFor="register-email" className="mb-2 block text-sm font-semibold text-slate-700">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input id="register-email" name="email" type="email" autoComplete="email" maxLength={255} required className={inputStyles} placeholder="you@example.com" />
                </div>
              </div>

              <div>
                <label htmlFor="register-password" className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input id="register-password" name="password" type="password" autoComplete="new-password" minLength={8} maxLength={72} required className={inputStyles} placeholder="At least 8 characters" />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff623f] px-5 py-3 font-semibold text-white transition hover:bg-[#e94727] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff623f] disabled:cursor-wait disabled:opacity-60"
              >
                {saving ? "Creating account..." : "Create account"}
                {!saving ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-[#e94727] hover:underline">
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
