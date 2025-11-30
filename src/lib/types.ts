export type ComplaintStatus = "pending" | "in_review" | "assigned" | "resolved" | "closed";
export type ComplaintPriority = "low" | "medium" | "high" | "urgent";
export type ComplaintCategory = "infrastructure" | "facilities" | "academic" | "administration" | "other";

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  imageUrl?: string;
  studentName: string;
  studentEmail: string;
  createdAt: string;
  updatedAt: string;
  notes: ComplaintNote[];
  assignedTo?: string;
}

export interface ComplaintNote {
  id: string;
  text: string;
  createdBy: string;
  createdAt: string;
}

export const COMPLAINT_CATEGORIES: { value: ComplaintCategory; label: string }[] = [
  { value: "infrastructure", label: "Infrastructure" },
  { value: "facilities", label: "Facilities" },
  { value: "academic", label: "Academic" },
  { value: "administration", label: "Administration" },
  { value: "other", label: "Other" },
];

export const COMPLAINT_PRIORITIES: { value: ComplaintPriority; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

export const COMPLAINT_STATUSES: { value: ComplaintStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "in_review", label: "In Review" },
  { value: "assigned", label: "Assigned" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
];
