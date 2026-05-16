import { Button } from "../common/Button";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-ink-600 dark:text-ink-300">
        Page <span className="font-semibold text-ink-900 dark:text-ink-100">{page}</span> of {totalPages}
      </p>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page <= 1}>
          Previous
        </Button>
        <Button
          variant="ghost"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
