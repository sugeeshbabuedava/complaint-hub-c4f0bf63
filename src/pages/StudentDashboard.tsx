import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getCurrentUser, getComplaintsByStudentId, logout } from "@/lib/storage";
import { Complaint } from "@/lib/types";
import { Plus, LogOut, User, FileText } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import ComplaintFilters from "@/components/ComplaintFilters";
import { StatusBadge } from "@/components/StatusBadge";
import { PriorityBadge } from "@/components/PriorityBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  useEffect(() => {
    if (!currentUser || currentUser.role !== "student") {
      toast.error("Please login to access dashboard");
      navigate("/student/login");
      return;
    }

    const userComplaints = getComplaintsByStudentId(currentUser.id);
    setComplaints(userComplaints);
    setFilteredComplaints(userComplaints);
  }, [currentUser, navigate]);

  useEffect(() => {
    let filtered = [...complaints];

    if (categoryFilter !== "all") {
      filtered = filtered.filter((c) => c.category === categoryFilter);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((c) => c.priority === priorityFilter);
    }

    if (dateFrom) {
      filtered = filtered.filter((c) => new Date(c.createdAt) >= new Date(dateFrom));
    }

    if (dateTo) {
      filtered = filtered.filter((c) => new Date(c.createdAt) <= new Date(dateTo));
    }

    // Sorting
    if (sortBy === "date-desc") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === "date-asc") {
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortBy === "priority-high") {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    } else if (sortBy === "priority-low") {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    setFilteredComplaints(filtered);
  }, [complaints, categoryFilter, priorityFilter, dateFrom, dateTo, sortBy]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header />
      <div className="absolute top-20 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-accent/20">
              <AvatarImage src={currentUser.profileImage} alt={currentUser.name} />
              <AvatarFallback className="text-xl bg-accent/10 text-accent">
                {currentUser.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">Welcome, {currentUser.name}!</h1>
              <p className="text-muted-foreground">Manage your complaints</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/student/profile")}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <Button size="lg" onClick={() => navigate("/submit-complaint")} className="w-full md:w-auto">
            <Plus className="h-5 w-5 mr-2" />
            Submit New Complaint
          </Button>
        </div>

        <div className="mb-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <ComplaintFilters
            onCategoryChange={setCategoryFilter}
            onStatusChange={() => {}}
            onPriorityChange={setPriorityFilter}
            onDateFromChange={setDateFrom}
            onDateToChange={setDateTo}
            onSortChange={setSortBy}
            showStatusFilter={false}
          />
        </div>

        <div className="grid gap-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
          {filteredComplaints.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-muted-foreground mb-2">
                  {complaints.length === 0 ? "No complaints yet" : "No complaints match your filters"}
                </p>
                {complaints.length === 0 && (
                  <Button onClick={() => navigate("/submit-complaint")} className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Submit Your First Complaint
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredComplaints.map((complaint) => (
              <Card
                key={complaint.id}
                className="hover:border-accent/40 transition-all hover:scale-[1.01] cursor-pointer"
                onClick={() => navigate(`/complaint/${complaint.id}`)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-mono text-accent">#{complaint.complaintId}</span>
                        <StatusBadge status={complaint.status} />
                        <PriorityBadge priority={complaint.priority} />
                      </div>
                      <CardTitle className="text-xl">{complaint.title}</CardTitle>
                      <CardDescription className="mt-2 line-clamp-2">
                        {complaint.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span className="capitalize">{complaint.category}</span>
                    <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
