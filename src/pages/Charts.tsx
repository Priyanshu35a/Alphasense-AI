import { useState, useMemo } from "react";
import { generateChartData, topStocks } from "@/lib/mockData";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line, ComposedChart } from "recharts";
import { TrendingUp, Info, ToggleLeft, ToggleRight } from "lucide-react";

const stocks = topStocks.slice(0, 6);

const patternInsights: Record<string, { pattern: string; explanation: string; success: number }> = {
  RELIANCE: { pattern: "Bullish Engulfing", explanation: "Stock is breaking resistance at ₹2,850 with RSI at 58. Historically similar patterns succeeded 76% of the time. MACD confirms bullish momentum.", success: 76 },
  TATASTEEL: { pattern: "Volume Breakout", explanation: "Price crossed ₹155 with 3x average volume. RSI at 65 confirms strength. This breakout pattern has a 72% success rate in metals sector.", success: 72 },
  HDFCBANK: { pattern: "Cup & Handle", explanation: "Forming cup & handle pattern. Support at ₹1,620, resistance at ₹1,680. RSI at 55 — neutral zone. Breakout above ₹1,680 targets ₹1,800.", success: 74 },
  INFY: { pattern: "Approaching Support", explanation: "Nearing key 200 DMA support at ₹1,410 — RSI at 38, entering oversold territory. Historically strong bounce zone with 65% probability.", success: 65 },
  TCS: { pattern: "Consolidation", explanation: "Trading in tight range ₹3,850-₹3,920. RSI at 48 — perfectly neutral. Breakout above ₹3,920 could trigger 5% upside.", success: 60 },
  ICICIBANK: { pattern: "Rising Channel", explanation: "Trading within ascending channel. RSI at 52 with bullish MACD. Support at ₹1,220, resistance at ₹1,260.", success: 68 },
};

export default function Charts() {
  const [selected, setSelected] = useState("TATASTEEL");
  const [showOverlays, setShowOverlays] = useState(true);
  const [showAIExplain, setShowAIExplain] = useState(true);
  const data = useMemo(() => generateChartData(selected), [selected]);
  const insight = patternInsights[selected] || patternInsights.RELIANCE;
  const stock = stocks.find((s) => s.symbol === selected) || stocks[0];
  const latestRsi = data[data.length - 1]?.rsi;

  return (
    <div className="space-y-6">
      <div>
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Chart Intelligence
        </motion.h1>
        <p className="text-sm text-muted-foreground mt-1">AI-powered pattern detection & technical analysis</p>
      </div>

      {/* Stock selector */}
      <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
        {stocks.map((s) => (
          <button
            key={s.symbol}
            onClick={() => setSelected(s.symbol)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selected === s.symbol
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-card-foreground hover:border-primary/30"
            }`}
          >
            {s.symbol}
          </button>
        ))}
      </div>

      {/* Toggles */}
      <div className="flex gap-4">
        <button
          onClick={() => setShowOverlays(!showOverlays)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            showOverlays ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
          }`}
        >
          {showOverlays ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
          Moving Averages
        </button>
        <button
          onClick={() => setShowAIExplain(!showAIExplain)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            showAIExplain ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
          }`}
        >
          {showAIExplain ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
          AI Explain Chart
        </button>
      </div>

      {/* Chart area */}
      <motion.div key={selected} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-border bg-card p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
          <div>
            <h2 className="font-display font-bold text-lg text-card-foreground">{stock.name}</h2>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold text-card-foreground">₹{stock.price.toLocaleString()}</span>
              <span className={`text-sm font-semibold ${stock.changePercent >= 0 ? "text-gain" : "text-loss"}`}>
                {stock.changePercent >= 0 ? "+" : ""}{stock.changePercent}%
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {latestRsi && (
              <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                latestRsi > 70 ? "bg-loss/10 text-loss" : latestRsi < 30 ? "bg-gain/10 text-gain" : "bg-muted text-muted-foreground"
              }`}>
                RSI: {latestRsi}
              </span>
            )}
            <span className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              {insight.pattern}
            </span>
          </div>
        </div>

        {/* Price chart with overlays */}
        <div className="h-[300px] md:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <defs>
                <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(217 91% 60%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(217 91% 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(220 10% 46%)" }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 10, fill: "hsl(220 10% 46%)" }} tickLine={false} axisLine={false} domain={["auto", "auto"]} />
              <Tooltip
                contentStyle={{ background: "hsl(220 25% 10%)", border: "1px solid hsl(220 20% 18%)", borderRadius: "8px", fontSize: "12px", color: "hsl(220 14% 92%)" }}
                labelStyle={{ color: "hsl(220 10% 55%)" }}
              />
              <Area type="monotone" dataKey="close" stroke="hsl(217 91% 60%)" strokeWidth={2} fill="url(#priceGrad)" />
              {showOverlays && (
                <>
                  <Line type="monotone" dataKey="sma50" stroke="hsl(38 92% 50%)" strokeWidth={1.5} dot={false} strokeDasharray="4 2" name="50 DMA" />
                  <Line type="monotone" dataKey="sma200" stroke="hsl(0 72% 55%)" strokeWidth={1.5} dot={false} strokeDasharray="6 3" name="200 DMA" />
                </>
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Legend for overlays */}
        {showOverlays && (
          <div className="flex gap-4 mt-2 justify-center">
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="w-4 h-0.5 bg-primary rounded" /> Price
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-warning">
              <span className="w-4 h-0.5 bg-warning rounded" style={{ borderTop: "2px dashed" }} /> 50 DMA
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-loss">
              <span className="w-4 h-0.5 bg-loss rounded" style={{ borderTop: "2px dashed" }} /> 200 DMA
            </span>
          </div>
        )}

        {/* RSI chart */}
        <div className="h-[80px] mt-3">
          <p className="text-[10px] text-muted-foreground mb-1 font-medium">RSI (14)</p>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: "hsl(220 10% 46%)" }} tickLine={false} axisLine={false} width={25} ticks={[30, 70]} />
              <Line type="monotone" dataKey="rsi" stroke="hsl(271 76% 53%)" strokeWidth={1.5} dot={false} />
              {/* Reference lines for overbought/oversold */}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Volume chart */}
        <div className="h-[60px] mt-2">
          <p className="text-[10px] text-muted-foreground mb-1 font-medium">Volume</p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar dataKey="volume" fill="hsl(217 91% 60%)" opacity={0.3} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* AI Insight */}
      {showAIExplain && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground mb-1">AI Pattern Analysis</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{insight.explanation}</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-1.5 flex-1 max-w-[200px] rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${insight.success}%` }} />
                </div>
                <span className="text-xs font-semibold text-primary">{insight.success}% historical success</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
