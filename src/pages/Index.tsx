import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AlertCircle, Shield, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block mb-6 p-3 bg-primary/10 rounded-2xl">
            <AlertCircle className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            BROTO Complaints
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Streamlined complaint management system for Brototype students and staff. 
            Submit, track, and resolve issues efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50" onClick={() => navigate("/submit")}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <UserCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Student Portal</CardTitle>
              </div>
              <CardDescription className="text-base">
                Submit and track your complaints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li>• Submit new complaints with details</li>
                <li>• Upload supporting images</li>
                <li>• Track complaint status in real-time</li>
                <li>• Receive updates on resolution</li>
              </ul>
              <Button className="w-full" size="lg">
                Submit a Complaint
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50" onClick={() => navigate("/admin/login")}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Admin Portal</CardTitle>
              </div>
              <CardDescription className="text-base">
                Manage and resolve complaints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li>• View all submitted complaints</li>
                <li>• Update complaint status</li>
                <li>• Add resolution notes</li>
                <li>• Assign staff members</li>
              </ul>
              <Button className="w-full" size="lg" variant="secondary">
                Admin Login
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            For admin access, use credentials: <span className="font-mono font-semibold">admin@broto.com</span> / <span className="font-mono font-semibold">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
