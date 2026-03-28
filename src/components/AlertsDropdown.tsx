import { Bell } from "lucide-react";

export default function AlertsDropdown() {
  return (
    <button className="relative p-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
      <Bell className="w-4 h-4" />
      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
    </button>
  );
}