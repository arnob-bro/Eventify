import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import AuthService from "../../apis/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const authService = new AuthService(); // instantiate class

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { token, user } = await authService.login(email, password);
      localStorage.setItem("authed", "1");
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      navigate("/student"); // redirect
    } catch (err) {
      setError(err.error || "Login failed");
    }

    setLoading(false);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to manage your registrations and keep up with the latest events."
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="you@aust.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
        />
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 py-2.5 text-white font-semibold shadow hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      {/* Footer suggestion for signup */}
      <p className="mt-4 text-sm text-center text-slate-700">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-indigo-600 hover:underline"
        >
          Create a new account
        </Link>
      </p>
    </AuthLayout>
  );
}
