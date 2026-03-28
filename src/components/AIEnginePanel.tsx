import { Zap } from "lucide-react";

export default function AIEnginePanel() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 flex items-center gap-4">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
        <Zap className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-card-foreground">AI Engine Active</h3>
        <p className="text-sm text-muted-foreground">Analyzing market signals in real-time</p>
      </div>
    </div>
  );
}
