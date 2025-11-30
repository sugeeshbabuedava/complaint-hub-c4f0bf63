import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Complaint } from "@/lib/types";
import { CheckCircle2, Clock, AlertCircle, FileText, TrendingUp } from "lucide-react";

interface DashboardStatsProps {
  complaints: Complaint[];
}

const COLORS = {
  pending: "hsl(var(--warning))",
  in_review: "hsl(var(--info))",
  assigned: "hsl(var(--info))",
  resolved: "hsl(var(--success))",
  closed: "hsl(var(--muted))",
};

const DashboardStats = ({ complaints }: DashboardStatsProps) => {
  const totalComplaints = complaints.length;
  const pendingCount = complaints.filter((c) => c.status === "pending").length;
  const inReviewCount = complaints.filter((c) => c.status === "in_review").length;
  const assignedCount = complaints.filter((c) => c.status === "assigned").length;
  const resolvedCount = complaints.filter((c) => c.status === "resolved").length;
  const closedCount = complaints.filter((c) => c.status === "closed").length;

  const statusData = [
    { name: "Pending", value: pendingCount, color: COLORS.pending },
    { name: "In Review", value: inReviewCount + assignedCount, color: COLORS.in_review },
    { name: "Resolved", value: resolvedCount, color: COLORS.resolved },
    { name: "Closed", value: closedCount, color: COLORS.closed },
  ];

  const categoryData = complaints.reduce((acc, complaint) => {
    const existing = acc.find((item) => item.name === complaint.category);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: complaint.category, count: 1 });
    }
    return acc;
  }, [] as { name: string; count: number }[]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-accent/20 hover:border-accent/40 transition-all hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
            <FileText className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{totalComplaints}</div>
            <p className="text-xs text-muted-foreground mt-1">All registered complaints</p>
          </CardContent>
        </Card>

        <Card className="border-warning/20 hover:border-warning/40 transition-all hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">{pendingCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting review</p>
          </CardContent>
        </Card>

        <Card className="border-info/20 hover:border-info/40 transition-all hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <TrendingUp className="h-5 w-5 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-info">{inReviewCount + assignedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Being handled</p>
          </CardContent>
        </Card>

        <Card className="border-success/20 hover:border-success/40 transition-all hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle2 className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">{resolvedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully resolved</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Complaints by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Complaints by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--accent))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;
