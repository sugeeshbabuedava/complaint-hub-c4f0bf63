import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StatusBadge } from "@/components/StatusBadge";
import { PriorityBadge } from "@/components/PriorityBadge";
import { getComplaintById } from "@/lib/storage";
import { Complaint } from "@/lib/types";
import { ArrowLeft, Calendar, User, Mail, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState<Complaint | null>(null);

  useEffect(() => {
    if (id) {
      const data = getComplaintById(id);
      setComplaint(data || null);
    }
  }, [id]);

  if (!complaint) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Complaint Not Found</CardTitle>
            <CardDescription>The complaint you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/")}>Back to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-2">{complaint.title}</CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={complaint.status} />
                    <PriorityBadge priority={complaint.priority} />
                    <Badge variant="outline">
                      <Tag className="h-3 w-3 mr-1" />
                      {complaint.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{complaint.description}</p>
              </div>

              {complaint.imageUrl && (
                <div>
                  <h3 className="font-semibold mb-2">Attached Image</h3>
                  <img
                    src={complaint.imageUrl}
                    alt="Complaint"
                    className="rounded-lg border max-w-full h-auto"
                  />
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Submitted by:</span>
                  <span className="font-medium">{complaint.studentName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{complaint.studentEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Created:</span>
                  <span className="font-medium">{new Date(complaint.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Updated:</span>
                  <span className="font-medium">{new Date(complaint.updatedAt).toLocaleString()}</span>
                </div>
              </div>

              {complaint.notes.length > 0 && (
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-4">Notes & Updates</h3>
                  <div className="space-y-3">
                    {complaint.notes.map((note) => (
                      <Card key={note.id} className="bg-muted/50">
                        <CardContent className="pt-4">
                          <p className="text-sm mb-2">{note.text}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>By {note.createdBy}</span>
                            <span>•</span>
                            <span>{new Date(note.createdAt).toLocaleString()}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
