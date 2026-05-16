import { Lead } from "../models/Lead.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { leadsToCsv } from "../utils/csv.js";

const PAGE_LIMIT = 10;

const buildFilters = (query: {
  status?: string;
  source?: string;
  search?: string;
}) => {
  const filters: Record<string, unknown> = {};
  if (query.status) {
    filters.status = query.status;
  }
  if (query.source) {
    filters.source = query.source;
  }
  if (query.search) {
    filters.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { email: { $regex: query.search, $options: "i" } }
    ];
  }
  return filters;
};

export const listLeads = asyncHandler(async (req, res) => {
  const { status, source, search, sort, page = 1 } = req.query as {
    status?: string;
    source?: string;
    search?: string;
    sort?: "latest" | "oldest";
    page?: number;
  };

  const filters = buildFilters({ status, source, search });
  const sortValue = sort === "oldest" ? 1 : -1;
  const skip = (Number(page) - 1) * PAGE_LIMIT;

  const [items, total] = await Promise.all([
    Lead.find(filters).sort({ createdAt: sortValue }).skip(skip).limit(PAGE_LIMIT),
    Lead.countDocuments(filters)
  ]);

  res.json({
    data: items,
    meta: {
      page: Number(page),
      limit: PAGE_LIMIT,
      total,
      totalPages: Math.ceil(total / PAGE_LIMIT)
    }
  });
});

export const getLead = asyncHandler(async (req, res, next) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    return next({ statusCode: 404, message: "Lead not found" });
  }
  res.json({ data: lead });
});

export const createLead = asyncHandler(async (req, res) => {
  const lead = await Lead.create(req.body);
  res.status(201).json({ data: lead });
});

export const updateLead = asyncHandler(async (req, res, next) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!lead) {
    return next({ statusCode: 404, message: "Lead not found" });
  }
  res.json({ data: lead });
});

export const deleteLead = asyncHandler(async (req, res, next) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);
  if (!lead) {
    return next({ statusCode: 404, message: "Lead not found" });
  }
  res.json({ message: "Lead deleted" });
});

export const exportLeads = asyncHandler(async (req, res) => {
  const { status, source, search, sort } = req.query as {
    status?: string;
    source?: string;
    search?: string;
    sort?: "latest" | "oldest";
  };

  const filters = buildFilters({ status, source, search });
  const sortValue = sort === "oldest" ? 1 : -1;
  const leads = await Lead.find(filters).sort({ createdAt: sortValue });

  const csv = leadsToCsv(leads);
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=leads.csv");
  res.send(csv);
});
