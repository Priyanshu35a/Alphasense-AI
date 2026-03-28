interface DemoModeToggleProps {
  demoMode: boolean;
  onToggle: (value: boolean) => void;
}

export default function DemoModeToggle({ demoMode, onToggle }: DemoModeToggleProps) {
  return (
    <button
      onClick={() => onToggle(!demoMode)}
      className="px-4 py-2 rounded-lg border border-border bg-card hover:bg-card/80 text-sm font-medium text-foreground transition-all"
    >
      {demoMode ? "Demo Mode" : "Live Mode"}
    </button>
  );
}
