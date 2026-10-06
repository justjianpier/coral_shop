import { ArrowLeft, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../features/auth/hooks/use-auth";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { account: user, checking: checkingSession, error: sessionError, signIn, signOut } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (saving) return;

    const form = new FormData(event.currentTarget);
    setSaving(true);
    setError("");
    try {
      const account = await signIn({
        email: form.get("email").trim(),
        password: form.get("password"),
      });
      const destination = account.role === "ROLE_ADMIN" ? "/admin" : "/account";
      const from = location.state?.from;
      navigate(from === destination || (destination === "/admin" && from?.startsWith("/admin/"))
        ? from : destination, { replace: true });
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

  async function handleLogout() {
    setSaving(true);
    setError("");
    try {
      await signOut();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-rose-50 via-orange-50 to-rose-50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-gray-600">
            {user ? `Signed in as ${user.email}` : "Please enter your details to sign in"}
          </p>
        </div>

        {error || sessionError ? (
          <p role="alert" className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error || sessionError}
          </p>
        ) : null}

        {user ? (
          <div role="status" className="space-y-5 text-center">
            <p className="rounded-xl bg-orange-50 px-4 py-3 text-sm text-[#a43c26]">
              Your session is active.
            </p>
            <Link to={user.role === "ROLE_ADMIN" ? "/admin" : "/account"} className="block rounded-lg bg-[#FF623F] px-4 py-3 font-semibold text-white hover:bg-[#e94727]">
              {user.role === "ROLE_ADMIN" ? "Open dashboard" : "Open my account"}
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              disabled={saving}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:text-[#e94727] disabled:opacity-60"
            >
              {saving ? "Signing out..." : "Sign out"}
            </button>
          </div>
        ) : (
          <>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 outline-none transition-colors focus:border-[#FF623F] focus:bg-white focus:ring-2 focus:ring-[#FF623F]"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="login-password" className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 outline-none transition-colors focus:border-[#FF623F] focus:bg-white focus:ring-2 focus:ring-[#FF623F]"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving || checkingSession}
                className="w-full rounded-lg bg-[#FF623F] px-4 py-3 font-semibold text-white hover:bg-[#e94727] disabled:cursor-wait disabled:opacity-60"
              >
                {checkingSession ? "Checking session..." : saving ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-[#FF623F] hover:underline">
                Sign up
              </Link>
            </p>
          </>
        )}

        <div className="mt-6 border-t border-gray-100 pt-6">
          <Link to="/" className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
