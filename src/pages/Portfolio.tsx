import { useState, useRef, useEffect } from "react";
import { defaultPortfolio, getAIResponse } from "@/lib/mockData";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Send, Bot, User, TrendingUp, TrendingDown, FileText, PieChart } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function Portfolio() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "👋 Hi! I'm your **AlphaSense AI** portfolio copilot. I can analyze your holdings, suggest buy/hold/sell actions, and answer questions about Indian stocks.\n\nTry asking:\n- \"Analyze my portfolio\"\n- \"Should I hold Reliance?\"\n- \"What's the outlook for Tata Steel?\"\n- \"Generate full portfolio report\"" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setTyping(true);
    setTimeout(() => {
      const response = getAIResponse(userMsg);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setTyping(false);
    }, 800 + Math.random() * 700);
  };

  const totalInvested = defaultPortfolio.reduce((s, p) => s + p.qty * p.avgPrice, 0);
  const totalCurrent = defaultPortfolio.reduce((s, p) => s + p.qty * p.currentPrice, 0);
  const totalPnl = totalCurrent - totalInvested;
  const totalPnlPercent = ((totalPnl / totalInvested) * 100).toFixed(2);

  // Sector allocation
  const sectors: Record<string, number> = {};
  defaultPortfolio.forEach(p => {
    const val = p.qty * p.currentPrice;
    sectors[p.sector] = (sectors[p.sector] || 0) + val;
  });
  const sectorEntries = Object.entries(sectors).sort((a, b) => b[1] - a[1]);
  const sectorColors = ["bg-primary", "bg-gain", "bg-warning", "bg-loss", "bg-[hsl(271_76%_53%)]"];

  // Diversification score
  const diversScore = 68;

  return (
    <div className="space-y-6">
      <div>
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Portfolio Analyzer
        </motion.h1>
        <p className="text-sm text-muted-foreground mt-1">AI-powered portfolio analysis & chat</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Portfolio holdings */}
        <div className="lg:col-span-2 space-y-4">
          {/* Summary */}
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Portfolio Value</p>
            <p className="text-2xl font-display font-bold text-card-foreground">₹{totalCurrent.toLocaleString()}</p>
            <div className={`flex items-center gap-1 mt-1 text-sm font-semibold ${totalPnl >= 0 ? "text-gain" : "text-loss"}`}>
              {totalPnl >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {totalPnl >= 0 ? "+" : ""}₹{Math.abs(totalPnl).toLocaleString()} ({totalPnlPercent}%)
            </div>
          </div>

          {/* Diversification Score */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <PieChart className="w-4 h-4 text-primary" />
              <p className="text-xs font-semibold text-card-foreground">Diversification Score</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${diversScore}%` }} />
              </div>
              <span className="text-lg font-display font-bold text-card-foreground">{diversScore}/100</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5">⚠️ Overexposed to Banking (35%). Add FMCG/Pharma.</p>
          </div>

          {/* Sector allocation */}
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-semibold text-card-foreground mb-3">Sector Allocation</p>
            <div className="space-y-2">
              {sectorEntries.map(([sector, val], i) => {
                const pct = ((val / totalCurrent) * 100).toFixed(1);
                return (
                  <div key={sector}>
                    <div className="flex justify-between text-[11px] mb-0.5">
                      <span className="text-card-foreground font-medium">{sector}</span>
                      <span className="text-muted-foreground">{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${sectorColors[i] || "bg-primary"}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Generate Report Button */}
          <button
            onClick={() => {
              setInput("Generate full portfolio report");
              setTimeout(() => {
                const userMsg = "Generate full portfolio report";
                setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
                setTyping(true);
                setTimeout(() => {
                  const response = getAIResponse(userMsg);
                  setMessages((prev) => [...prev, { role: "assistant", content: response }]);
                  setTyping(false);
                }, 1200);
              }, 100);
              setInput("");
            }}
            className="w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center gap-2 font-medium text-sm"
          >
            <FileText className="w-4 h-4" />
            Generate Full Portfolio Report
          </button>

          {/* Holdings */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-display font-semibold text-card-foreground">Your Holdings</h3>
            </div>
            <div className="divide-y divide-border/50">
              {defaultPortfolio.map((item) => {
                const pnl = (item.currentPrice - item.avgPrice) * item.qty;
                return (
                  <div key={item.id} className="px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-card-foreground">{item.symbol}</p>
                      <p className="text-[11px] text-muted-foreground">{item.qty} qty @ ₹{item.avgPrice} • {item.sector}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-card-foreground">₹{item.currentPrice.toLocaleString()}</p>
                      <p className={`text-[11px] font-semibold ${pnl >= 0 ? "text-gain" : "text-loss"}`}>
                        {pnl >= 0 ? "+" : ""}₹{Math.abs(pnl).toLocaleString()} ({item.change > 0 ? "+" : ""}{item.change}%)
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="lg:col-span-3 rounded-xl border border-border bg-card flex flex-col h-[700px]">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-display font-semibold text-card-foreground">AI Copilot Chat</h3>
              <p className="text-[10px] text-muted-foreground">Ask anything about your portfolio</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  msg.role === "user" ? "bg-primary" : "gradient-primary"
                }`}>
                  {msg.role === "user" ? <User className="w-3.5 h-3.5 text-primary-foreground" /> : <Bot className="w-3.5 h-3.5 text-primary-foreground" />}
                </div>
                <div className={`max-w-[85%] rounded-xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}>
                  <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:mb-2 [&>p:last-child]:mb-0">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              </motion.div>
            ))}
            {typing && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="p-3 border-t border-border">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about your portfolio or any stock..."
                className="flex-1 bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                onClick={send}
                disabled={!input.trim()}
                className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
