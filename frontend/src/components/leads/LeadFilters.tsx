import { LeadSource, LeadStatus } from "../../types/leads";
import { Input } from "../common/Input";
import { Select } from "../common/Select";

export interface LeadFiltersState {
  status: LeadStatus | "";
  source: LeadSource | "";
  search: string;
  sort: "latest" | "oldest";
}

interface LeadFiltersProps {
  value: LeadFiltersState;
  onChange: (next: LeadFiltersState) => void;
}

export const LeadFilters = ({ value, onChange }: LeadFiltersProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Select
        label="Status"
        value={value.status}
        onChange={(event) => onChange({ ...value, status: event.target.value as LeadStatus | "" })}
      >
        <option value="">All</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Lost">Lost</option>
      </Select>
      <Select
        label="Source"
        value={value.source}
        onChange={(event) => onChange({ ...value, source: event.target.value as LeadSource | "" })}
      >
        <option value="">All</option>
        <option value="Website">Website</option>
        <option value="Instagram">Instagram</option>
        <option value="Referral">Referral</option>
      </Select>
      <Input
        label="Search"
        placeholder="Name or email"
        value={value.search}
        onChange={(event) => onChange({ ...value, search: event.target.value })}
      />
      <Select
        label="Sort"
        value={value.sort}
        onChange={(event) => onChange({ ...value, sort: event.target.value as "latest" | "oldest" })}
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
      </Select>
    </div>
  );
};
