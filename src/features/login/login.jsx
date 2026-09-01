import { Mail, Lock } from 'lucide-react';

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-rose-50 via-orange-50 to-rose-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="font-semibold text-3xl tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Please enter your details to sign in
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF623F] focus:border-[#FF623F] transition-colors bg-gray-50 focus:bg-white outline-none"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF623F] focus:border-[#FF623F] transition-colors bg-gray-50 focus:bg-white outline-none"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex justify-end mt-2">
              <a href="#" className="text-sm font-medium text-[#FF623F] hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#FF623F] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md"
          >
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="#" className="font-medium text-[#FF623F] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
