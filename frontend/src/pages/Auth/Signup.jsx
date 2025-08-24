import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import AuthService from "../../apis/auth";

export default function Signup() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    department: "",
    student_id: "",
    phone: "",
    password: "",
    confirm_password: "",
    year_of_study: 1,
    profile_image: null,
  });
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const authService = new AuthService();

  const handleChange = (e) => {
    if (parseInt(form.year_of_study, 10) <= 0 || isNaN(form.year_of_study)) {
      setError("Year of study must be a positive integer");
      return;
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await authService.signup(form);
      // Navigate to login page after successful signup
      navigate("/login");
    } catch (err) {
      setError(err.error || "Signup failed");
    }
    setLoading(false);
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Eventify to register faster, track events, and get personalized updates."
      footer={
        <>
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Log in
          </a>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={form.username}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          />
          <input
            type="number"
            name="year_of_study"
            placeholder="Year of Study"
            required
            min="1"
            step="1"
            value={form.year_of_study}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          />
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            required
            value={form.first_name}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            required
            value={form.last_name}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="email"
            name="email"
            placeholder="you@gmail.com"
            required
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            name="student_id"
            placeholder="Student ID"
            value={form.student_id}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          />
          <input
            type="tel"
            name="phone"
            placeholder="+8801XXXXXXXXX"
            value={form.phone}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative mt-1">
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Create a password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-10 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 text-xs hover:text-slate-700"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>

          <div className="relative mt-1">
            <input
              type={show2 ? "text" : "password"}
              name="confirm_password"
              placeholder="Re-enter password"
              required
              value={form.confirm_password}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-10 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
            <button
              type="button"
              onClick={() => setShow2((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 text-xs hover:text-slate-700"
            >
              {show2 ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            required
            className="h-4 w-4 rounded border-slate-300 text-indigo-600"
          />
          I agree to the{" "}
          <a href="/terms" className="text-indigo-600 hover:underline">
            Terms & Privacy
          </a>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 py-2.5 text-white font-semibold shadow hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </AuthLayout>
  );
}
