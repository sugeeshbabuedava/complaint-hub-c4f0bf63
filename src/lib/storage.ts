import { Complaint } from "./types";

const COMPLAINTS_KEY = "broto_complaints";

export const getComplaints = (): Complaint[] => {
  const data = localStorage.getItem(COMPLAINTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveComplaints = (complaints: Complaint[]): void => {
  localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints));
};

export const addComplaint = (complaint: Complaint): void => {
  const complaints = getComplaints();
  complaints.push(complaint);
  saveComplaints(complaints);
};

export const updateComplaint = (id: string, updates: Partial<Complaint>): void => {
  const complaints = getComplaints();
  const index = complaints.findIndex((c) => c.id === id);
  if (index !== -1) {
    complaints[index] = { 
      ...complaints[index], 
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveComplaints(complaints);
  }
};

export const getComplaintById = (id: string): Complaint | undefined => {
  const complaints = getComplaints();
  return complaints.find((c) => c.id === id);
};
