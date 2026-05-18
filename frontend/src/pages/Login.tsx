import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login({ email, password });
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="card w-full max-w-md p-8 text-ink-900 dark:text-ink-50">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-200">Log in to manage your lead pipeline.</p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm font-semibold text-sunset-500 dark:text-sunset-300">{error}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-ink-600 dark:text-ink-200">
          New here? <Link className="font-semibold text-ink-900 dark:text-ink-50" to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
};
