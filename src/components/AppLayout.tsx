import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, LineChart, MessageSquare, Zap, Eye, TrendingUp, Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AlertsDropdown from "@/components/AlertsDropdown";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/charts", label: "Charts", icon: LineChart },
  { path: "/portfolio", label: "Portfolio AI", icon: MessageSquare },
  { path: "/watchlist", label: "Watchlist", icon: Eye },
  { path: "/impact", label: "Impact", icon: TrendingUp },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [dark, setDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark", !dark);
  };

  // Set dark mode on mount
  if (typeof document !== "undefined" && !document.documentElement.classList.contains("dark") && dark) {
    document.documentElement.classList.add("dark");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-5 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-bold font-display text-sidebar-primary-foreground tracking-tight">AlphaSense AI</h1>
              <p className="text-[10px] text-sidebar-foreground/60 tracking-wider uppercase">Smart Investor Copilot</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {item.label === "Dashboard" && (
                  <span className="ml-auto pulse-dot text-[10px] font-semibold text-gain">LIVE</span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border space-y-1">
          <div className="flex items-center justify-between px-3 py-2">
            <AlertsDropdown />
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-bold font-display text-sidebar-primary-foreground">AlphaSense AI</span>
        </Link>
        <div className="flex items-center gap-1">
          <AlertsDropdown />
          <button onClick={toggleDark} className="p-2 text-sidebar-foreground">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-sidebar-foreground">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed top-14 left-0 right-0 z-40 bg-sidebar border-b border-sidebar-border p-3 space-y-1"
          >
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto scrollbar-thin md:pt-0 pt-14">
        <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
