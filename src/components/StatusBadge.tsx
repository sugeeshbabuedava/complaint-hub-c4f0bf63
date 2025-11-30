import { Badge } from "@/components/ui/badge";
import { ComplaintStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: ComplaintStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<ComplaintStatus, { variant: string; label: string }> = {
    pending: { variant: "secondary", label: "Pending" },
    in_review: { variant: "default", label: "In Review" },
    assigned: { variant: "default", label: "Assigned" },
    resolved: { variant: "default", label: "Resolved" },
    closed: { variant: "outline", label: "Closed" },
  };

  const config = variants[status];

  return (
    <Badge 
      variant={config.variant as any}
      className={
        status === "pending" ? "bg-warning text-warning-foreground" :
        status === "in_review" ? "bg-info text-info-foreground" :
        status === "assigned" ? "bg-primary text-primary-foreground" :
        status === "resolved" ? "bg-success text-success-foreground" :
        "bg-muted text-muted-foreground"
      }
    >
      {config.label}
    </Badge>
  );
}
