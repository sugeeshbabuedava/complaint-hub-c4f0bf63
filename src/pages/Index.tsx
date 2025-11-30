import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AlertCircle, Shield, UserCircle, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header />
      <div className="absolute top-20 right-4">
        <ThemeToggle />
      </div>
      
      <div className="container mx-auto px-4 py-16 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block mb-6 p-3 bg-accent/10 rounded-2xl animate-scale-in">
            <AlertCircle className="h-16 w-16 text-accent" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
            BROTO Complaints
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Streamlined complaint management system for Brototype students and staff. 
            Submit, track, and resolve issues efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-2 hover:border-accent/50 animate-fade-in" style={{ animationDelay: "100ms" }} onClick={() => navigate("/student/login")}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <UserCircle className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-2xl">Student Portal</CardTitle>
              </div>
              <CardDescription className="text-base">
                Submit and track your complaints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Submit multiple complaints with details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Upload supporting images</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Track complaint status with unique ID</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Get email & WhatsApp updates</span>
                </li>
              </ul>
              <Button className="w-full" size="lg">
                <LogIn className="h-4 w-4 mr-2" />
                Student Login
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-2 hover:border-accent/50 animate-fade-in" style={{ animationDelay: "200ms" }} onClick={() => navigate("/admin/login")}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-2xl">Admin Portal</CardTitle>
              </div>
              <CardDescription className="text-base">
                Manage and resolve complaints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>View analytics dashboard with charts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Filter by date, category & priority</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Send WhatsApp & Email updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Add resolution notes</span>
                </li>
              </ul>
              <Button className="w-full" size="lg" variant="secondary">
                <Shield className="h-4 w-4 mr-2" />
                Admin Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
