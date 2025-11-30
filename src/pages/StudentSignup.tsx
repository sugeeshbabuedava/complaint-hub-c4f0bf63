import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { addUser, getUserByEmail, setCurrentUser } from "@/lib/storage";
import { ArrowLeft, UserPlus } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import LoadingAnimation from "@/components/LoadingAnimation";

const StudentSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const existingUser = getUserByEmail(formData.email);
    if (existingUser) {
      toast.error("An account with this email already exists");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newUser = {
        id: Date.now().toString(),
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: "student" as const,
        createdAt: new Date().toISOString(),
      };

      addUser(newUser);
      setCurrentUser(newUser);
      toast.success("Account created successfully! Welcome, " + newUser.name);
      navigate("/student/dashboard");
    }, 1500);
  };

  if (loading) {
    return <LoadingAnimation />;
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
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Button>

        <Card className="max-w-md mx-auto animate-fade-in border-accent/20">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
              <UserPlus className="h-8 w-8 text-accent" />
            </div>
            <CardTitle className="text-3xl">Create Account</CardTitle>
            <CardDescription className="text-base">
              Join us to submit and track your complaints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  required
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  required
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="At least 6 characters"
                  required
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Re-enter your password"
                  required
                  className="text-base"
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                <UserPlus className="h-5 w-5 mr-2" />
                Create Account
              </Button>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/student/login" className="text-accent hover:underline font-semibold">
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentSignup;
