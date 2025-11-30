import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-primary/80 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center animate-fade-in">
        <div className="mb-8 animate-scale-in">
          <MessageSquare className="h-24 w-24 mx-auto text-primary-foreground animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold text-primary-foreground mb-2">
          BROTO Complaints
        </h1>
        <p className="text-primary-foreground/80 text-lg">
          Your voice matters
        </p>
        <div className="mt-8 flex justify-center gap-2">
          <div className="h-2 w-2 bg-primary-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="h-2 w-2 bg-primary-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="h-2 w-2 bg-primary-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
