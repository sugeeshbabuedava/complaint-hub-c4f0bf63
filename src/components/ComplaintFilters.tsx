import { Filter, SortAsc } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { COMPLAINT_CATEGORIES, COMPLAINT_STATUSES, COMPLAINT_PRIORITIES } from "@/lib/types";

interface ComplaintFiltersProps {
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
  onPriorityChange: (priority: string) => void;
  onDateFromChange: (date: string) => void;
  onDateToChange: (date: string) => void;
  onSortChange: (sort: string) => void;
  showStatusFilter?: boolean;
}

const ComplaintFilters = ({
  onCategoryChange,
  onStatusChange,
  onPriorityChange,
  onDateFromChange,
  onDateToChange,
  onSortChange,
  showStatusFilter = true,
}: ComplaintFiltersProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-accent" />
        <h3 className="font-semibold text-lg">Filters & Sorting</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category-filter" className="flex items-center gap-2">
            <span>Category</span>
          </Label>
          <Select onValueChange={onCategoryChange}>
            <SelectTrigger id="category-filter">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {COMPLAINT_CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {showStatusFilter && (
          <div className="space-y-2">
            <Label htmlFor="status-filter">Status</Label>
            <Select onValueChange={onStatusChange}>
              <SelectTrigger id="status-filter">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {COMPLAINT_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="priority-filter">Priority</Label>
          <Select onValueChange={onPriorityChange}>
            <SelectTrigger id="priority-filter">
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              {COMPLAINT_PRIORITIES.map((pri) => (
                <SelectItem key={pri.value} value={pri.value}>
                  {pri.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date-from">From Date</Label>
          <Input
            id="date-from"
            type="date"
            onChange={(e) => onDateFromChange(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date-to">To Date</Label>
          <Input
            id="date-to"
            type="date"
            onChange={(e) => onDateToChange(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sort" className="flex items-center gap-2">
            <SortAsc className="h-4 w-4 text-accent" />
            <span>Sort By</span>
          </Label>
          <Select onValueChange={onSortChange} defaultValue="date-desc">
            <SelectTrigger id="sort">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Newest First</SelectItem>
              <SelectItem value="date-asc">Oldest First</SelectItem>
              <SelectItem value="priority-high">High Priority First</SelectItem>
              <SelectItem value="priority-low">Low Priority First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ComplaintFilters;
