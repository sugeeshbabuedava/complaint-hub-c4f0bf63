import { Badge } from "@/components/ui/badge";
import { ComplaintPriority } from "@/lib/types";
import { AlertCircle, AlertTriangle, Info, Zap } from "lucide-react";

interface PriorityBadgeProps {
  priority: ComplaintPriority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = {
    low: { icon: Info, label: "Low", className: "bg-muted text-muted-foreground" },
    medium: { icon: AlertCircle, label: "Medium", className: "bg-info text-info-foreground" },
    high: { icon: AlertTriangle, label: "High", className: "bg-warning text-warning-foreground" },
    urgent: { icon: Zap, label: "Urgent", className: "bg-destructive text-destructive-foreground" },
  };

  const { icon: Icon, label, className } = config[priority];

  return (
    <Badge variant="secondary" className={className}>
      <Icon className="h-3 w-3 mr-1" />
      {label}
    </Badge>
  );
}
