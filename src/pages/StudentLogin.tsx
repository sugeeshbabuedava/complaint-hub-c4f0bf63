import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getUserByEmail, setCurrentUser } from "@/lib/storage";
import { ArrowLeft, LogIn } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import LoadingAnimation from "@/components/LoadingAnimation";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    // Simulate loading delay for better UX
    setTimeout(() => {
      const user = getUserByEmail(formData.email);

      if (!user) {
        toast.error("No account found with this email");
        setLoading(false);
        return;
      }

      if (user.password !== formData.password) {
        toast.error("Incorrect password");
        setLoading(false);
        return;
      }

      if (user.role !== "student") {
        toast.error("Please use the admin login page");
        setLoading(false);
        return;
      }

      setCurrentUser(user);
      toast.success("Welcome back, " + user.name + "!");
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
              <LogIn className="h-8 w-8 text-accent" />
            </div>
            <CardTitle className="text-3xl">Student Login</CardTitle>
            <CardDescription className="text-base">
              Access your complaints dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Enter your password"
                  required
                  className="text-base"
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                <LogIn className="h-5 w-5 mr-2" />
                Login
              </Button>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/student/signup" className="text-accent hover:underline font-semibold">
                    Sign up here
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

export default StudentLogin;
