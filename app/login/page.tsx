"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLoginAdmin } from "../hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLoginAdmin();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Form reload prevent karein
    loginMutation.mutate(form, {
      onSuccess: (res) => {
        localStorage.setItem("token", res.data.token);
        router.push("/admin");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
      {/* Background Decorative Elements (Optional) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[30%] h-[30%] bg-blue-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-[10%] -right-[5%] w-[30%] h-[30%] bg-indigo-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative w-full max-w-[420px]">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-blue-200 mb-4">
            X
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 text-sm mt-1">Please enter your admin credentials</p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  type="email"
                  placeholder="admin@xed.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 pl-10 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 pl-10 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {loginMutation.isError && (
              <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-xl text-xs font-medium animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={14} />
                <span>Invalid email or password. Please try again.</span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 h-auto font-semibold shadow-lg shadow-blue-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Login to Dashboard</span>
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center text-slate-400 text-xs mt-8">
          &copy; 2024 XED Institute. Internal Access Only.
        </p>
      </div>
    </div>
  );
}