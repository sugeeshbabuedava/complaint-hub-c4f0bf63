import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <div className="bg-accent/10 border-b border-accent/20 py-3">
      <div className="container mx-auto px-4 flex items-center justify-center gap-2 text-sm">
        <Phone className="h-4 w-4 text-accent" />
        <span className="text-foreground">For immediate assistance, call:</span>
        <Button
          variant="link"
          className="h-auto p-0 text-accent font-semibold hover:text-accent/80"
          asChild
        >
          <a href="tel:+919995557776">+91 999 555 7776</a>
        </Button>
      </div>
    </div>
  );
};

export default Header;
