import { useState, type FormEvent } from "react";
import type { Lead, LeadSource, LeadStatus } from "../../types/leads";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { Select } from "../common/Select";

export interface LeadFormValues {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
}

interface LeadFormProps {
  initial?: Lead | null;
  onSubmit: (values: LeadFormValues) => Promise<void>;
  onCancel?: () => void;
}

export const LeadForm = ({ initial, onSubmit, onCancel }: LeadFormProps) => {
  const [values, setValues] = useState<LeadFormValues>({
    name: initial?.name ?? "",
    email: initial?.email ?? "",
    status: initial?.status ?? "New",
    source: initial?.source ?? "Website"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof LeadFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value } as LeadFormValues));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit(values);
      if (!initial) {
        setValues({ name: "", email: "", status: "New", source: "Website" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save lead");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100">
            {initial ? "Edit lead" : "Create lead"}
          </h3>
          <p className="text-xs text-ink-500 dark:text-ink-300">Keep details crisp and accurate.</p>
        </div>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Close
          </Button>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Name"
          value={values.name}
          onChange={(event) => handleChange("name", event.target.value)}
          required
        />
        <Input
          label="Email"
          type="email"
          value={values.email}
          onChange={(event) => handleChange("email", event.target.value)}
          required
        />
        <Select
          label="Status"
          value={values.status}
          onChange={(event) => handleChange("status", event.target.value)}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </Select>
        <Select
          label="Source"
          value={values.source}
          onChange={(event) => handleChange("source", event.target.value)}
        >
          <option value="Website">Website</option>
          <option value="Instagram">Instagram</option>
          <option value="Referral">Referral</option>
        </Select>
      </div>
      {error && <p className="text-sm font-semibold text-sunset-500 dark:text-sunset-300">{error}</p>}
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save lead"}
        </Button>
      </div>
    </form>
  );
};
