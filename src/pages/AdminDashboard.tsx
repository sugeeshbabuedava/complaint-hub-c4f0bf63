import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StatusBadge } from "@/components/StatusBadge";
import { PriorityBadge } from "@/components/PriorityBadge";
import { getCurrentUser, getComplaints, updateComplaint, logout } from "@/lib/storage";
import { Complaint, COMPLAINT_STATUSES, ComplaintStatus } from "@/lib/types";
import { LogOut, User, Mail, MessageCircle, Plus } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import ComplaintFilters from "@/components/ComplaintFilters";
import DashboardStats from "@/components/DashboardStats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [newNote, setNewNote] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      toast.error("Please login to access admin dashboard");
      navigate("/admin/login");
      return;
    }
    loadComplaints();
  }, [currentUser, navigate]);

  useEffect(() => {
    filterComplaints();
  }, [complaints, categoryFilter, statusFilter, priorityFilter, dateFrom, dateTo, sortBy]);

  const loadComplaints = () => {
    setComplaints(getComplaints());
  };

  const filterComplaints = () => {
    let filtered = [...complaints];
    if (categoryFilter !== "all") filtered = filtered.filter((c) => c.category === categoryFilter);
    if (statusFilter !== "all") filtered = filtered.filter((c) => c.status === statusFilter);
    if (priorityFilter !== "all") filtered = filtered.filter((c) => c.priority === priorityFilter);
    if (dateFrom) filtered = filtered.filter((c) => new Date(c.createdAt) >= new Date(dateFrom));
    if (dateTo) filtered = filtered.filter((c) => new Date(c.createdAt) <= new Date(dateTo));

    if (sortBy === "date-desc") filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    else if (sortBy === "date-asc") filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    else if (sortBy === "priority-high") {
      const order = { urgent: 4, high: 3, medium: 2, low: 1 };
      filtered.sort((a, b) => order[b.priority] - order[a.priority]);
    } else if (sortBy === "priority-low") {
      const order = { urgent: 4, high: 3, medium: 2, low: 1 };
      filtered.sort((a, b) => order[a.priority] - order[b.priority]);
    }
    setFilteredComplaints(filtered);
  };

  const handleStatusChange = (complaintId: string, newStatus: ComplaintStatus) => {
    updateComplaint(complaintId, { status: newStatus });
    loadComplaints();
    toast.success("Status updated successfully");
  };

  const handleAddNote = () => {
    if (!selectedComplaint || !newNote.trim()) return;
    const note = { id: Date.now().toString(), text: newNote, createdBy: currentUser?.name || "Admin", createdAt: new Date().toISOString() };
    updateComplaint(selectedComplaint.id, { notes: [...selectedComplaint.notes, note] });
    setNewNote("");
    loadComplaints();
    toast.success("Note added successfully");
    setSelectedComplaint(null);
  };

  const handleSendEmail = (complaint: Complaint) => {
    const subject = encodeURIComponent(`Update on Complaint #${complaint.complaintId}`);
    const body = encodeURIComponent(`Hello ${complaint.studentName},\n\nYour complaint "${complaint.title}" (ID: ${complaint.complaintId}) has been updated.\n\nCurrent Status: ${complaint.status}\n\nBest regards,\nBROTO Team`);
    window.open(`mailto:${complaint.studentEmail}?subject=${subject}&body=${body}`, '_blank');
    toast.success("Email client opened");
  };

  const handleSendWhatsApp = (complaint: Complaint) => {
    if (!complaint.studentPhone) {
      toast.error("No phone number available");
      return;
    }
    const message = encodeURIComponent(`Hello ${complaint.studentName}, your complaint "${complaint.title}" (ID: ${complaint.complaintId}) status: ${complaint.status}`);
    window.open(`https://wa.me/${complaint.studentPhone.replace(/\D/g, '')}?text=${message}`, '_blank');
    toast.success("WhatsApp opened");
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header />
      <div className="absolute top-20 right-4"><ThemeToggle /></div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-accent/20">
              <AvatarImage src={currentUser.profileImage} />
              <AvatarFallback className="text-xl bg-accent/10 text-accent">{currentUser.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div><h1 className="text-3xl font-bold">Admin Dashboard</h1><p className="text-muted-foreground">Manage all complaints</p></div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/admin/profile")}><User className="h-4 w-4 mr-2" />Profile</Button>
            <Button variant="outline" onClick={() => { logout(); toast.success("Logged out"); navigate("/"); }}><LogOut className="h-4 w-4 mr-2" />Logout</Button>
          </div>
        </div>

        <div className="mb-8"><DashboardStats complaints={complaints} /></div>
        <div className="mb-6"><ComplaintFilters onCategoryChange={setCategoryFilter} onStatusChange={setStatusFilter} onPriorityChange={setPriorityFilter} onDateFromChange={setDateFrom} onDateToChange={setDateTo} onSortChange={setSortBy} /></div>

        <div className="grid gap-4">
          {filteredComplaints.map((c) => (
            <Card key={c.id} className="hover:border-accent/40 transition-all">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    {c.studentProfileImage && <Avatar className="h-12 w-12"><AvatarImage src={c.studentProfileImage} /><AvatarFallback>{c.studentName.charAt(0)}</AvatarFallback></Avatar>}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-mono text-accent font-semibold">#{c.complaintId}</span>
                        <StatusBadge status={c.status} />
                        <PriorityBadge priority={c.priority} />
                      </div>
                      <CardTitle className="text-xl">{c.title}</CardTitle>
                      <CardDescription className="mt-2">{c.description}</CardDescription>
                      <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
                        <span>By: {c.studentName}</span>
                        <span>Category: {c.category}</span>
                        <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleSendEmail(c)}><Mail className="h-4 w-4" /></Button>
                    {c.studentPhone && <Button size="sm" variant="outline" onClick={() => handleSendWhatsApp(c)}><MessageCircle className="h-4 w-4" /></Button>}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Select value={c.status} onValueChange={(v) => handleStatusChange(c.id, v as ComplaintStatus)}>
                  <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                  <SelectContent>{COMPLAINT_STATUSES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
                </Select>
                <Button size="sm" variant="outline" onClick={() => setSelectedComplaint(c)}><Plus className="h-4 w-4 mr-2" />Add Note</Button>
                <Button size="sm" onClick={() => navigate(`/complaint/${c.id}`)}>View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={!!selectedComplaint} onOpenChange={() => setSelectedComplaint(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Note</DialogTitle><DialogDescription>Add a resolution note for this complaint</DialogDescription></DialogHeader>
            <div className="space-y-4"><Label>Note</Label><Textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} rows={4} /></div>
            <div className="flex gap-2 justify-end"><Button variant="outline" onClick={() => setSelectedComplaint(null)}>Cancel</Button><Button onClick={handleAddNote}>Add Note</Button></div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
