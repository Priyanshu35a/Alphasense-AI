import { useState } from "react";
import { signals, impactMetrics } from "@/lib/mockData";
import SignalCard from "@/components/SignalCard";
import MarketTicker from "@/components/MarketTicker";
import StockTable from "@/components/StockTable";
import AIEnginePanel from "@/components/AIEnginePanel";
import NewsSentiment from "@/components/NewsSentiment";
import DemoModeToggle from "@/components/DemoModeToggle";
import { motion } from "framer-motion";
import { Clock, Target, Zap, Eye } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { clock: Clock, target: Target, zap: Zap, eye: Eye };

export default function Dashboard() {
  const [demoMode, setDemoMode] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Opportunity Radar
          </motion.h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time signals from NSE/BSE powered by AI</p>
        </div>
        <DemoModeToggle demoMode={demoMode} onToggle={setDemoMode} />
      </div>

      {/* AI Engine Panel */}
      <AIEnginePanel />

      {/* Market ticker */}
      <MarketTicker />

      {/* Impact metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {impactMetrics.map((m, i) => {
          const Icon = iconMap[m.icon];
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
              </div>
              <p className="font-display font-bold text-xl text-card-foreground">{m.value}</p>
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="text-[10px] text-muted-foreground/70 mt-0.5">{m.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Signals */}
      <div>
        <h2 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          Live Signals
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gain/10 text-gain font-semibold ml-1">{signals.length} active</span>
        </h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {signals.map((s, i) => (
            <SignalCard key={s.id} signal={s} index={i} />
          ))}
        </div>
      </div>

      {/* News Sentiment */}
      <NewsSentiment />

      {/* Stock table */}
      <StockTable />
    </div>
  );
}
