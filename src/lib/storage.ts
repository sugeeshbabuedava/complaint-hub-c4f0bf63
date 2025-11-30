import { Complaint, User } from "./types";

const COMPLAINTS_KEY = "broto_complaints";
const USERS_KEY = "broto_users";
const CURRENT_USER_KEY = "broto_current_user";
const COMPLAINT_COUNTER_KEY = "broto_complaint_counter";

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

export const getComplaintsByStudentId = (studentId: string): Complaint[] => {
  const complaints = getComplaints();
  return complaints.filter((c) => c.studentId === studentId);
};

// Generate human-readable complaint ID
export const generateComplaintId = (): string => {
  const counter = localStorage.getItem(COMPLAINT_COUNTER_KEY);
  const nextNumber = counter ? parseInt(counter) + 1 : 1;
  localStorage.setItem(COMPLAINT_COUNTER_KEY, nextNumber.toString());
  return `CMPL-${nextNumber.toString().padStart(4, '0')}`;
};

// User Management
export const getUsers = (): User[] => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveUsers = (users: User[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const addUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
};

export const getUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find((u) => u.email === email);
};

export const updateUser = (id: string, updates: Partial<User>): void => {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    saveUsers(users);
  }
};

// Current User Session
export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const logout = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};
