import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/ThemeToggle";
import { addComplaint, getCurrentUser, generateComplaintId } from "@/lib/storage";
import { COMPLAINT_CATEGORIES, COMPLAINT_PRIORITIES, ComplaintCategory, ComplaintPriority } from "@/lib/types";
import { ArrowLeft, Upload } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  
  useEffect(() => {
    if (!currentUser || currentUser.role !== "student") {
      toast.error("Please login to submit a complaint");
      navigate("/student/login");
    }
  }, [currentUser, navigate]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "" as ComplaintCategory,
    priority: "" as ComplaintPriority,
    studentPhone: "",
    imageUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error("Please login first");
      navigate("/student/login");
      return;
    }

    if (!formData.title || !formData.description || !formData.category || !formData.priority) {
      toast.error("Please fill in all required fields");
      return;
    }

    const complaint = {
      id: Date.now().toString(),
      complaintId: generateComplaintId(),
      ...formData,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      studentProfileImage: currentUser.profileImage,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: [],
    };

    addComplaint(complaint);
    toast.success("Complaint submitted successfully!");
    navigate("/student/dashboard");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
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
        <Button
          variant="ghost"
          className="mb-6 group"
          onClick={() => navigate("/student/dashboard")}
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Button>

        <Card className="max-w-2xl mx-auto animate-fade-in border-accent/20">
          <CardHeader>
            <CardTitle className="text-3xl">Submit a Complaint</CardTitle>
            <CardDescription className="text-base">
              Fill in the details below to submit your complaint. Our staff will review and respond promptly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Your Name</Label>
                  <Input
                    id="studentName"
                    value={currentUser.name}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentEmail">Your Email</Label>
                  <Input
                    id="studentEmail"
                    type="email"
                    value={currentUser.email}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentPhone">Phone Number (Optional)</Label>
                <Input
                  id="studentPhone"
                  type="tel"
                  value={formData.studentPhone}
                  onChange={(e) => setFormData({ ...formData, studentPhone: e.target.value })}
                  placeholder="+91 9876543210"
                  className="text-base"
                />
                <p className="text-sm text-muted-foreground">
                  Provide your phone number to receive WhatsApp updates
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Complaint Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Brief description of the issue"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide detailed information about your complaint"
                  rows={5}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value as ComplaintCategory })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMPLAINT_CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority *</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value as ComplaintPriority })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMPLAINT_PRIORITIES.map((pri) => (
                        <SelectItem key={pri.value} value={pri.value}>
                          {pri.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Supporting Image (Optional)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="cursor-pointer"
                  />
                  <Upload className="h-5 w-5 text-muted-foreground" />
                </div>
                {formData.imageUrl && (
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="mt-2 max-w-full h-48 object-cover rounded-lg border"
                  />
                )}
              </div>

              <Button type="submit" className="w-full" size="lg">
                Submit Complaint
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubmitComplaint;
