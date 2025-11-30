import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getCurrentUser, updateUser, setCurrentUser } from "@/lib/storage";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import ProfileUpload from "@/components/ProfileUpload";

const AdminProfile = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    profileImage: currentUser?.profileImage || "",
  });

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      toast.error("Please login to access profile");
      navigate("/admin/login");
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) return;

    if (!formData.name || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    updateUser(currentUser.id, {
      name: formData.name,
      email: formData.email,
      profileImage: formData.profileImage,
    });

    const updatedUser = { ...currentUser, ...formData };
    setCurrentUser(updatedUser);

    toast.success("Profile updated successfully!");
    navigate("/admin/dashboard");
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
          onClick={() => navigate("/admin/dashboard")}
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Button>

        <Card className="max-w-2xl mx-auto animate-fade-in border-accent/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Admin Profile</CardTitle>
            <CardDescription className="text-base">
              Update your personal information and profile picture
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <ProfileUpload
                currentImage={formData.profileImage}
                userName={formData.name}
                onImageChange={(imageData) => setFormData({ ...formData, profileImage: imageData })}
              />

              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Admin Name"
                    required
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="admin@example.com"
                    required
                    className="text-base"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Save className="h-5 w-5 mr-2" />
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfile;
