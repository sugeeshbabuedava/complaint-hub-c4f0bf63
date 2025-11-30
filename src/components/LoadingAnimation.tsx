import { Loader2 } from "lucide-react";

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="text-center">
        <Loader2 className="h-16 w-16 mx-auto text-primary animate-spin" />
        <p className="mt-4 text-lg font-medium text-foreground animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingAnimation;
