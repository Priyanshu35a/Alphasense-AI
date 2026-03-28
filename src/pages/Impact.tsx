import { motion } from "framer-motion";
import { Clock, Target, Zap, Eye, TrendingUp, Shield, BarChart3, Users, DollarSign, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const metrics = [
  { icon: Clock, value: "2-3 hrs", label: "Time Saved Daily", desc: "Automated signal detection replaces hours of manual chart reading and news tracking" },
  { icon: Target, value: "73%", label: "Signal Accuracy", desc: "Backtested across 500+ stocks over 2 years on NSE/BSE historical data" },
  { icon: Zap, value: "< 5 sec", label: "Signal Latency", desc: "From market event to AI-generated alert delivered to your dashboard" },
  { icon: BarChart3, value: "24", label: "Active Signals/Day", desc: "Average number of actionable signals generated across all tracked stocks" },
  { icon: Eye, value: "500+", label: "Stocks Monitored", desc: "Continuous real-time monitoring of NSE & BSE listed companies" },
  { icon: Users, value: "10K+", label: "Retail Investors", desc: "Helping individual investors make data-driven decisions daily" },
  { icon: Shield, value: "4 Agents", label: "Multi-Agent AI", desc: "Data, Signal, Reasoning, and Alert agents working together in real-time" },
  { icon: TrendingUp, value: "+18%", label: "Avg. Portfolio Alpha", desc: "Estimated outperformance vs Nifty 50 for users following top signals" },
];

// Before vs After AI data
const beforeAfterData = [
  { month: "Jan", withoutAI: 2.1, withAI: 4.8 },
  { month: "Feb", withoutAI: -1.5, withAI: 3.2 },
  { month: "Mar", withoutAI: 1.8, withAI: 5.1 },
  { month: "Apr", withoutAI: -0.5, withAI: 2.9 },
  { month: "May", withoutAI: 3.2, withAI: 6.4 },
  { month: "Jun", withoutAI: 0.8, withAI: 4.7 },
  { month: "Jul", withoutAI: -2.1, withAI: 1.8 },
  { month: "Aug", withoutAI: 1.5, withAI: 5.3 },
  { month: "Sep", withoutAI: 2.8, withAI: 7.1 },
  { month: "Oct", withoutAI: -0.3, withAI: 3.5 },
  { month: "Nov", withoutAI: 1.2, withAI: 4.9 },
  { month: "Dec", withoutAI: 2.5, withAI: 6.8 },
];

const lossAvoidanceData = [
  { category: "False Breakouts", avoided: 42000 },
  { category: "Stop-Loss Triggers", avoided: 28000 },
  { category: "Sentiment Traps", avoided: 35000 },
  { category: "Sector Rotation", avoided: 18000 },
];

export default function Impact() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Impact & Metrics
        </motion.h1>
        <p className="text-sm text-muted-foreground mt-1">How AlphaSense AI empowers retail investors</p>
      </div>

      {/* Hero stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl gradient-primary p-6 text-center">
          <p className="text-primary-foreground/70 text-xs font-medium mb-1">Estimated Profit Improvement</p>
          <p className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">+15%</p>
          <p className="text-primary-foreground/60 text-xs mt-1">vs manual trading</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="rounded-2xl bg-gain/10 border border-gain/20 p-6 text-center">
          <p className="text-gain/70 text-xs font-medium mb-1">Loss Avoidance</p>
          <p className="text-3xl md:text-4xl font-display font-bold text-gain">₹1.23L</p>
          <p className="text-gain/60 text-xs mt-1">per month estimated</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="rounded-2xl bg-card border border-border p-6 text-center">
          <p className="text-muted-foreground text-xs font-medium mb-1">Time Saved Daily</p>
          <p className="text-3xl md:text-4xl font-display font-bold text-card-foreground">2-3 hrs</p>
          <p className="text-muted-foreground/60 text-xs mt-1">per investor per day</p>
        </motion.div>
      </div>

      {/* Before vs After chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <ArrowUpRight className="w-5 h-5 text-primary" />
          <h2 className="font-display font-bold text-lg text-card-foreground">Returns: Before vs After AI</h2>
        </div>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={beforeAfterData}>
              <defs>
                <linearGradient id="withAIGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(152 69% 45%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(152 69% 45%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="withoutAIGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(220 10% 46%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(220 10% 46%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(220 10% 46%)" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(220 10% 46%)" }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                contentStyle={{ background: "hsl(220 25% 10%)", border: "1px solid hsl(220 20% 18%)", borderRadius: "8px", fontSize: "12px", color: "hsl(220 14% 92%)" }}
              />
              <Area type="monotone" dataKey="withoutAI" stroke="hsl(220 10% 46%)" strokeWidth={1.5} fill="url(#withoutAIGrad)" name="Without AI (%)" />
              <Area type="monotone" dataKey="withAI" stroke="hsl(152 69% 45%)" strokeWidth={2} fill="url(#withAIGrad)" name="With AI (%)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-6 justify-center mt-2">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-3 h-0.5 bg-muted-foreground rounded" /> Without AI</span>
          <span className="flex items-center gap-1.5 text-xs text-gain"><span className="w-3 h-0.5 bg-gain rounded" /> With AI</span>
        </div>
      </motion.div>

      {/* Loss Avoidance */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-warning" />
          <h2 className="font-display font-bold text-lg text-card-foreground">Loss Avoidance Breakdown</h2>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={lossAvoidanceData} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(220 10% 46%)" }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
              <YAxis type="category" dataKey="category" tick={{ fontSize: 10, fill: "hsl(220 10% 46%)" }} tickLine={false} axisLine={false} width={120} />
              <Tooltip
                contentStyle={{ background: "hsl(220 25% 10%)", border: "1px solid hsl(220 20% 18%)", borderRadius: "8px", fontSize: "12px", color: "hsl(220 14% 92%)" }}
                formatter={(val: number) => [`₹${val.toLocaleString()}`, "Losses Avoided"]}
              />
              <Bar dataKey="avoided" fill="hsl(38 92% 50%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Metric grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-all"
          >
            <m.icon className="w-5 h-5 text-primary mb-3" />
            <p className="font-display font-bold text-2xl text-card-foreground">{m.value}</p>
            <p className="text-sm font-semibold text-card-foreground mt-1">{m.label}</p>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{m.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Architecture */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="font-display font-bold text-lg text-card-foreground mb-4">Multi-Agent Architecture</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { agent: "Data Agent", desc: "Fetches real-time stock data, news, and sentiment from NSE/BSE feeds", color: "text-primary", tasks: ["NSE/BSE data", "News feed", "Sentiment scraping"] },
            { agent: "Signal Agent", desc: "Detects volume spikes, breakouts, RSI/MACD signals, and patterns", color: "text-gain", tasks: ["RSI/MACD", "Volume analysis", "Pattern detection"] },
            { agent: "Reasoning Agent", desc: "Generates insights with confidence scores and risk assessment", color: "text-warning", tasks: ["Confidence scoring", "Risk levels", "Backtesting"] },
            { agent: "Action Agent", desc: "Produces Buy/Sell/Hold with entry, target, and stop-loss levels", color: "text-loss", tasks: ["Entry/Target/SL", "Portfolio alerts", "Smart notifications"] },
          ].map((a, i) => (
            <motion.div key={a.agent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }} className="p-4 rounded-lg bg-muted/50">
              <div className={`w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center bg-card border border-border`}>
                <Zap className={`w-4 h-4 ${a.color}`} />
              </div>
              <p className="text-sm font-semibold text-card-foreground text-center">{a.agent}</p>
              <p className="text-xs text-muted-foreground mt-1 text-center">{a.desc}</p>
              <div className="mt-3 space-y-1">
                {a.tasks.map(task => (
                  <div key={task} className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {task}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        {/* Flow */}
        <div className="flex items-center justify-center gap-0 mt-4">
          {["Data Agent", "→", "Signal Agent", "→", "Reasoning Agent", "→", "Action Agent"].map((label, i) =>
            label === "→" ? (
              <span key={i} className="text-primary/40 text-lg mx-3">→</span>
            ) : (
              <span key={i} className="text-[11px] text-muted-foreground font-semibold px-2 py-1 rounded-md bg-muted">{label}</span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
