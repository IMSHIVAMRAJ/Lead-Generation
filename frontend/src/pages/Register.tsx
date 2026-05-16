import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { Select } from "../components/common/Select";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../types/auth";

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "sales" as UserRole });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-ink-900 dark:text-ink-100">Create your account</h1>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">Start tracking leads in minutes.</p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <Select label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}>
            <option value="sales">Sales</option>
            <option value="admin">Admin</option>
          </Select>
          {error && <p className="text-sm font-semibold text-sunset-500 dark:text-sunset-300">{error}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-ink-600 dark:text-ink-300">
          Already have an account? <Link className="font-semibold text-ink-900 dark:text-ink-100" to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};
