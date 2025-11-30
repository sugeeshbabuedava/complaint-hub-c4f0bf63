export type ComplaintStatus = "pending" | "in_review" | "assigned" | "resolved" | "closed";
export type ComplaintPriority = "low" | "medium" | "high" | "urgent";
export type ComplaintCategory = "infrastructure" | "facilities" | "academic" | "administration" | "other";

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "student" | "admin";
  profileImage?: string;
  createdAt: string;
}

export interface Complaint {
  id: string;
  complaintId: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  studentProfileImage?: string;
  imageUrl?: string;
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
