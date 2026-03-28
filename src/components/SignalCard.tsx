import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Eye, Volume2, ChevronDown, ChevronUp, Target, Shield, BarChart3 } from "lucide-react";
import type { Signal } from "@/lib/mockData";

const typeConfig = {
  BUY: { bg: "bg-gain/10", text: "text-gain", icon: TrendingUp, label: "BUY" },
  SELL: { bg: "bg-loss/10", text: "text-loss", icon: TrendingDown, label: "SELL" },
  WATCH: { bg: "bg-warning/10", text: "text-warning", icon: Eye, label: "WATCH" },
};

const riskColors = { Low: "text-gain", Medium: "text-warning", High: "text-loss" };

export default function SignalCard({ signal, index }: { signal: Signal; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const config = typeConfig[signal.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className={`rounded-xl border bg-card p-4 transition-all group ${
        signal.type === "BUY" ? "border-gain/20 hover:border-gain/40 hover:shadow-[0_0_20px_hsl(var(--gain)/0.1)]" :
        signal.type === "SELL" ? "border-loss/20 hover:border-loss/40 hover:shadow-[0_0_20px_hsl(var(--loss)/0.1)]" :
        "border-border hover:border-primary/30"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold ${config.bg} ${config.text}`}>
            <Icon className="w-3 h-3" />
            {config.label}
          </span>
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${riskColors[signal.riskLevel]}`}>
            {signal.riskLevel} Risk
          </span>
        </div>
        <span className="text-xs font-semibold text-muted-foreground">
          {signal.confidence}%
        </span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-display font-bold text-card-foreground">{signal.symbol}</h3>
        <span className="text-xs text-muted-foreground">{signal.stock}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{signal.reason}</p>
      
      {/* Technical indicators row */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground">RSI: {signal.rsi}</span>
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground">MACD: {signal.macd}</span>
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground">Trend: {signal.trendStrength}</span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-card-foreground">₹{signal.price.toLocaleString()}</span>
        <span className={signal.change >= 0 ? "text-gain font-medium" : "text-loss font-medium"}>
          {signal.change >= 0 ? "+" : ""}{signal.change}%
        </span>
        <span className="flex items-center gap-1 text-muted-foreground text-xs">
          <Volume2 className="w-3 h-3" />
          {signal.volume}
        </span>
      </div>

      {/* Why This Signal button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
      >
        {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        {expanded ? "Hide Details" : "Why This Signal?"}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 pt-3 border-t border-border/50 space-y-3">
              {/* Technical reasoning */}
              <div>
                <p className="text-[11px] font-semibold text-card-foreground mb-1 flex items-center gap-1">
                  <BarChart3 className="w-3 h-3 text-primary" /> Technical Analysis
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{signal.technicalReason}</p>
              </div>

              {/* Sentiment */}
              {signal.sentimentImpact && (
                <div>
                  <p className="text-[11px] font-semibold text-card-foreground mb-1">📰 Sentiment</p>
                  <p className="text-[11px] text-muted-foreground">{signal.sentimentImpact}</p>
                </div>
              )}

              {/* Entry/Target/SL */}
              {signal.entry && (
                <div className="flex gap-3">
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3 text-primary" />
                    <span className="text-[10px] text-muted-foreground">Entry: ₹{signal.entry}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-gain" />
                    <span className="text-[10px] text-muted-foreground">Target: ₹{signal.target}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-loss" />
                    <span className="text-[10px] text-muted-foreground">SL: ₹{signal.stopLoss}</span>
                  </div>
                </div>
              )}

              {/* Backtest */}
              <div className="rounded-lg bg-muted/50 p-2.5">
                <p className="text-[10px] font-semibold text-card-foreground mb-1">📊 Backtested ({signal.backtestYears} years)</p>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${signal.historicalSuccess}%` }} />
                  </div>
                  <span className="text-[10px] font-semibold text-primary">{signal.historicalSuccess}%</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">{signal.pastPatternCount} similar patterns found</p>
              </div>

              {/* DMA info */}
              <div className="flex gap-4 text-[10px] text-muted-foreground">
                <span>50 DMA: ₹{signal.dma50}</span>
                <span>200 DMA: ₹{signal.dma200}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
