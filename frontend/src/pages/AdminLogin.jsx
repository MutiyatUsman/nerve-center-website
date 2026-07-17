import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth, formatApiError } from "../lib/auth";
import { NerveLogo } from "../components/NerveLogo";

export default function AdminLogin() {
  const { user, login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (user && user !== false && user !== null) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Signed in.");
      nav("/admin");
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <main data-testid="admin-login-page" className="min-h-screen bg-aggie-void text-editorial-cream flex items-center justify-center px-6 py-24 relative overflow-hidden">
      <div className="vascular-watermark opacity-30" />
      <div className="relative w-full max-w-md">
        <NerveLogo color="#F9F8F6" accent="#FDB927" />
        <h1 className="font-serif text-5xl mt-10 leading-tight">Admin sign-in</h1>
        <p className="mt-3 text-sm text-white/60">Site editor access for NERVE Center staff.</p>

        <form onSubmit={submit} className="mt-10 space-y-6">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest opacity-70">Email</label>
            <input data-testid="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="mt-2 w-full bg-transparent border-b border-white/30 focus:border-aggie-gold outline-none py-2 text-base" />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest opacity-70">Password</label>
            <input data-testid="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="mt-2 w-full bg-transparent border-b border-white/30 focus:border-aggie-gold outline-none py-2 text-base" />
          </div>
          <button type="submit" disabled={loading} data-testid="admin-login-submit"
            className="w-full bg-aggie-gold text-aggie-void px-6 py-4 font-mono text-xs uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50">
            {loading ? "Signing in..." : "Sign in →"}
          </button>
        </form>
      </div>
    </main>
  );
}
