export interface Signal {
  id: string;
  type: "BUY" | "SELL" | "WATCH";
  stock: string;
  symbol: string;
  reason: string;
  confidence: number;
  price: number;
  change: number;
  volume: string;
  timestamp: string;
  rsi: number;
  macd: string;
  dma50: number;
  dma200: number;
  trendStrength: "Strong" | "Moderate" | "Weak";
  riskLevel: "Low" | "Medium" | "High";
  entry?: number;
  target?: number;
  stopLoss?: number;
  historicalSuccess: number;
  technicalReason: string;
  sentimentImpact?: string;
  backtestYears: number;
  pastPatternCount: number;
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  sector: string;
}

export interface PortfolioItem {
  id: string;
  symbol: string;
  name: string;
  qty: number;
  avgPrice: number;
  currentPrice: number;
  change: number;
  sector: string;
}

export interface ChartPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  sma50?: number;
  sma200?: number;
  rsi?: number;
}

export interface NewsItem {
  id: string;
  headline: string;
  source: string;
  time: string;
  sentiment: "Positive" | "Negative" | "Neutral";
  impact: string;
  relatedStocks: string[];
}

export interface AlertItem {
  id: string;
  type: "breakout" | "risk" | "portfolio" | "sentiment";
  title: string;
  message: string;
  time: string;
  read: boolean;
  severity: "info" | "warning" | "critical";
}

export const signals: Signal[] = [
  {
    id: "1", type: "BUY", stock: "Tata Steel", symbol: "TATASTEEL",
    reason: "Breakout above 200 DMA with RSI 65 and 3x avg volume",
    confidence: 78, price: 157.4, change: 4.2, volume: "45.2M", timestamp: "2 min ago",
    rsi: 65, macd: "Bullish Crossover", dma50: 148.2, dma200: 142.5, trendStrength: "Strong",
    riskLevel: "Medium", entry: 157, target: 175, stopLoss: 145,
    historicalSuccess: 72, technicalReason: "Breakout above 200 DMA with RSI at 65 — historically 72% success rate in metals sector. MACD bullish crossover confirms momentum.",
    sentimentImpact: "Steel demand surge news supports bullish trend",
    backtestYears: 2, pastPatternCount: 18
  },
  {
    id: "2", type: "BUY", stock: "Reliance Industries", symbol: "RELIANCE",
    reason: "Bullish engulfing with institutional buying and RSI recovery from 42",
    confidence: 82, price: 2847.5, change: 2.1, volume: "12.8M", timestamp: "8 min ago",
    rsi: 58, macd: "Bullish", dma50: 2780, dma200: 2650, trendStrength: "Strong",
    riskLevel: "Low", entry: 2840, target: 3050, stopLoss: 2750,
    historicalSuccess: 76, technicalReason: "Bullish engulfing pattern on daily chart with RSI recovery from oversold 42 to 58. Price above both 50 & 200 DMA — strong uptrend confirmed.",
    sentimentImpact: "Earnings growth news — Positive sentiment",
    backtestYears: 2, pastPatternCount: 24
  },
  {
    id: "3", type: "SELL", stock: "Adani Enterprises", symbol: "ADANIENT",
    reason: "Breakdown below 200-DMA with RSI 32 and increasing sell pressure",
    confidence: 71, price: 2340.0, change: -3.8, volume: "18.5M", timestamp: "15 min ago",
    rsi: 32, macd: "Bearish Crossover", dma50: 2480, dma200: 2520, trendStrength: "Weak",
    riskLevel: "High", entry: 2340, target: 2100, stopLoss: 2420,
    historicalSuccess: 68, technicalReason: "Breakdown below 200-DMA with RSI at 32 (oversold). Bearish MACD crossover with increasing sell volume suggests further downside.",
    sentimentImpact: "Regulatory concerns — Negative sentiment",
    backtestYears: 2, pastPatternCount: 12
  },
  {
    id: "4", type: "WATCH", stock: "Infosys", symbol: "INFY",
    reason: "Approaching key support at ₹1,420 — RSI 38 nearing oversold",
    confidence: 65, price: 1435.2, change: -0.8, volume: "8.2M", timestamp: "22 min ago",
    rsi: 38, macd: "Neutral", dma50: 1460, dma200: 1410, trendStrength: "Weak",
    riskLevel: "Medium", historicalSuccess: 65,
    technicalReason: "Approaching 200 DMA support at ₹1,410 with RSI at 38. Historically strong bounce zone with 65% probability. Wait for confirmation.",
    backtestYears: 2, pastPatternCount: 15
  },
  {
    id: "5", type: "BUY", stock: "HDFC Bank", symbol: "HDFCBANK",
    reason: "Insider buying + Cup & Handle pattern forming with RSI 55",
    confidence: 74, price: 1672.8, change: 1.5, volume: "15.1M", timestamp: "35 min ago",
    rsi: 55, macd: "Bullish", dma50: 1640, dma200: 1580, trendStrength: "Moderate",
    riskLevel: "Low", entry: 1670, target: 1800, stopLoss: 1620,
    historicalSuccess: 74, technicalReason: "Cup & Handle pattern forming. Breakout above ₹1,680 targets ₹1,800. Insider buying confirms institutional confidence.",
    sentimentImpact: "NIM expansion expected — Positive",
    backtestYears: 2, pastPatternCount: 20
  },
  {
    id: "6", type: "SELL", stock: "Paytm", symbol: "PAYTM",
    reason: "Bearish divergence on RSI with declining volume and price below all DMAs",
    confidence: 68, price: 385.6, change: -5.2, volume: "22.3M", timestamp: "42 min ago",
    rsi: 28, macd: "Bearish", dma50: 420, dma200: 480, trendStrength: "Weak",
    riskLevel: "High", entry: 385, target: 340, stopLoss: 410,
    historicalSuccess: 70, technicalReason: "RSI at 28 with bearish divergence. Price below both 50 & 200 DMA. Declining volume confirms bearish momentum.",
    sentimentImpact: "Regulatory headwinds — Negative",
    backtestYears: 2, pastPatternCount: 10
  },
];

export const newsItems: NewsItem[] = [
  { id: "1", headline: "Reliance Q4 earnings beat estimates with 12% revenue growth", source: "Economic Times", time: "15 min ago", sentiment: "Positive", impact: "Supports bullish trend for RELIANCE — price target revised upward", relatedStocks: ["RELIANCE"] },
  { id: "2", headline: "Steel demand surges 22% on infrastructure spending boost", source: "Mint", time: "32 min ago", sentiment: "Positive", impact: "Metal sector rally expected — TATASTEEL, JSW Steel to benefit", relatedStocks: ["TATASTEEL"] },
  { id: "3", headline: "IT sector faces headwinds as global tech spending slows", source: "Business Standard", time: "1 hr ago", sentiment: "Negative", impact: "Near-term weakness for INFY, TCS, WIPRO — watch for support levels", relatedStocks: ["INFY", "TCS", "WIPRO"] },
  { id: "4", headline: "RBI keeps repo rate unchanged at 6.5%", source: "Reuters", time: "2 hrs ago", sentiment: "Neutral", impact: "Banking sector stable — NIM expansion for HDFCBANK, ICICIBANK", relatedStocks: ["HDFCBANK", "ICICIBANK"] },
  { id: "5", headline: "SEBI tightens FPO norms for Adani Group companies", source: "NDTV Profit", time: "3 hrs ago", sentiment: "Negative", impact: "Regulatory risk increases for ADANIENT — sell pressure likely", relatedStocks: ["ADANIENT"] },
  { id: "6", headline: "Telecom ARPU growth drives Bharti Airtel to 52-week high", source: "Moneycontrol", time: "4 hrs ago", sentiment: "Positive", impact: "Strong momentum for BHARTIARTL — breakout above resistance", relatedStocks: ["BHARTIARTL"] },
];

export const alerts: AlertItem[] = [
  { id: "1", type: "breakout", title: "TATASTEEL Breakout Alert", message: "Price crossed ₹155 resistance with 3x volume. BUY signal generated.", time: "2 min ago", read: false, severity: "critical" },
  { id: "2", type: "risk", title: "Portfolio Risk Warning", message: "IT sector allocation at 25% — underperforming. Consider rebalancing.", time: "15 min ago", read: false, severity: "warning" },
  { id: "3", type: "sentiment", title: "Sentiment Shift: ADANIENT", message: "Negative news flow detected. Sentiment score dropped to 28/100.", time: "30 min ago", read: false, severity: "warning" },
  { id: "4", type: "portfolio", title: "Stop-Loss Triggered", message: "PAYTM dropped below ₹390 stop-loss. Review position.", time: "45 min ago", read: true, severity: "critical" },
  { id: "5", type: "breakout", title: "RELIANCE Bullish Pattern", message: "Bullish engulfing confirmed. Entry at ₹2,840 recommended.", time: "1 hr ago", read: true, severity: "info" },
];

export const marketOverview: StockData[] = [
  { symbol: "NIFTY50", name: "Nifty 50", price: 24250.35, change: 142.5, changePercent: 0.59, volume: "1.2B", marketCap: "", sector: "Index" },
  { symbol: "SENSEX", name: "Sensex", price: 79845.20, change: 468.2, changePercent: 0.59, volume: "980M", marketCap: "", sector: "Index" },
  { symbol: "BANKNIFTY", name: "Bank Nifty", price: 52340.80, change: -125.4, changePercent: -0.24, volume: "650M", marketCap: "", sector: "Index" },
];

export const topStocks: StockData[] = [
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2847.5, change: 58.3, changePercent: 2.1, volume: "12.8M", marketCap: "₹19.2L Cr", sector: "Energy" },
  { symbol: "TCS", name: "Tata Consultancy", price: 3892.4, change: -23.1, changePercent: -0.59, volume: "4.5M", marketCap: "₹14.1L Cr", sector: "IT" },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1672.8, change: 24.7, changePercent: 1.5, volume: "15.1M", marketCap: "₹12.7L Cr", sector: "Banking" },
  { symbol: "INFY", name: "Infosys", price: 1435.2, change: -11.5, changePercent: -0.8, volume: "8.2M", marketCap: "₹5.9L Cr", sector: "IT" },
  { symbol: "ICICIBANK", name: "ICICI Bank", price: 1245.6, change: 18.9, changePercent: 1.54, volume: "11.3M", marketCap: "₹8.7L Cr", sector: "Banking" },
  { symbol: "TATASTEEL", name: "Tata Steel", price: 157.4, change: 6.3, changePercent: 4.2, volume: "45.2M", marketCap: "₹1.9L Cr", sector: "Metals" },
  { symbol: "BHARTIARTL", name: "Bharti Airtel", price: 1580.3, change: 32.1, changePercent: 2.07, volume: "6.7M", marketCap: "₹9.4L Cr", sector: "Telecom" },
  { symbol: "WIPRO", name: "Wipro", price: 485.2, change: -8.4, changePercent: -1.7, volume: "9.1M", marketCap: "₹2.5L Cr", sector: "IT" },
];

export const defaultPortfolio: PortfolioItem[] = [
  { id: "1", symbol: "RELIANCE", name: "Reliance Industries", qty: 50, avgPrice: 2650, currentPrice: 2847.5, change: 7.45, sector: "Energy" },
  { id: "2", symbol: "HDFCBANK", name: "HDFC Bank", qty: 30, avgPrice: 1580, currentPrice: 1672.8, change: 5.87, sector: "Banking" },
  { id: "3", symbol: "INFY", name: "Infosys", qty: 100, avgPrice: 1520, currentPrice: 1435.2, change: -5.58, sector: "IT" },
  { id: "4", symbol: "TATASTEEL", name: "Tata Steel", qty: 200, avgPrice: 140, currentPrice: 157.4, change: 12.43, sector: "Metals" },
  { id: "5", symbol: "TCS", name: "Tata Consultancy", qty: 20, avgPrice: 3750, currentPrice: 3892.4, change: 3.80, sector: "IT" },
  { id: "6", symbol: "ICICIBANK", name: "ICICI Bank", qty: 40, avgPrice: 1180, currentPrice: 1245.6, change: 5.56, sector: "Banking" },
];

export function generateChartData(symbol: string): ChartPoint[] {
  const data: ChartPoint[] = [];
  let basePrice = symbol === "RELIANCE" ? 2700 : symbol === "TATASTEEL" ? 140 : symbol === "HDFCBANK" ? 1600 : symbol === "ICICIBANK" ? 1180 : symbol === "TCS" ? 3800 : 1400;
  const now = new Date();
  const closes: number[] = [];

  for (let i = 90; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const volatility = (Math.random() - 0.48) * basePrice * 0.03;
    basePrice = Math.max(basePrice * 0.9, basePrice + volatility);
    const open = basePrice;
    const close = open + (Math.random() - 0.45) * open * 0.02;
    const high = Math.max(open, close) + Math.random() * open * 0.01;
    const low = Math.min(open, close) - Math.random() * open * 0.01;
    closes.push(+close.toFixed(2));

    const idx = closes.length - 1;
    const sma50 = idx >= 49 ? closes.slice(idx - 49, idx + 1).reduce((a, b) => a + b, 0) / 50 : undefined;
    const sma200 = idx >= 49 ? closes.slice(Math.max(0, idx - 49), idx + 1).reduce((a, b) => a + b, 0) / Math.min(50, idx + 1) * (1 + (Math.random() - 0.5) * 0.02) : undefined;

    // Simplified RSI calculation
    let rsi: number | undefined;
    if (idx >= 14) {
      let gains = 0, losses = 0;
      for (let j = idx - 13; j <= idx; j++) {
        const diff = closes[j] - closes[j - 1];
        if (diff > 0) gains += diff;
        else losses -= diff;
      }
      const avgGain = gains / 14;
      const avgLoss = losses / 14;
      rsi = avgLoss === 0 ? 100 : +(100 - 100 / (1 + avgGain / avgLoss)).toFixed(1);
    }

    data.push({
      date: date.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
      open: +open.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close: +close.toFixed(2),
      volume: Math.floor(5000000 + Math.random() * 20000000),
      sma50: sma50 ? +sma50.toFixed(2) : undefined,
      sma200: sma200 ? +sma200.toFixed(2) : undefined,
      rsi,
    });
  }
  return data;
}

export const chatResponses: Record<string, string> = {
  "reliance": "**Reliance Industries (₹2,847.50)**\n\n📊 **Recommendation: HOLD** (Confidence: 76%)\n\n**Technical Indicators:**\n- RSI: 58 (Neutral-Bullish)\n- MACD: Bullish\n- Price vs 50 DMA: +2.4% above\n- Price vs 200 DMA: +7.5% above\n\n**Reasoning:**\n- Strong institutional buying with FII holding increasing by 0.8% last quarter\n- Revenue growth of 12% YoY supported by Jio and retail segments\n- Current P/E of 28.5x is slightly above sector average of 25x\n\n**Risk Level: Low** 🟢\n\n**Risk Factors:**\n- Petrochemical margins under pressure due to global oversupply\n- New energy capex may impact near-term profitability\n\n💡 *Consider holding if your allocation is below 15% of portfolio. If above, partial profit booking at ₹2,900+ is advisable.*",
  "portfolio": "**Portfolio Analysis Summary**\n\n📊 **Overall Health: Good** (Score: 7.2/10)\n\n**📈 Diversification Score: 68/100**\n\n**Sector Allocation:**\n- Banking: 35% ⚠️ *Overexposed*\n- IT: 28%\n- Energy: 22%\n- Metals: 15%\n\n**Risk Exposure:**\n- Overall Risk: Medium\n- Concentration Risk: High (Banking at 35%)\n- Missing: FMCG, Pharma, Auto sectors\n\n**Strengths:**\n- ✅ Overall portfolio up +5.2% — outperforming Nifty50 by 1.8%\n- ✅ Energy allocation provides stability\n\n**Concerns:**\n- ⚠️ Overexposed to banking sector (35%)\n- ⚠️ IT sector underperforming — consider sector rotation\n- ⚠️ No FMCG/Pharma for defensive balance\n\n**Recommendations:**\n1. 🟢 **Hold** Reliance & HDFC Bank — strong fundamentals\n2. 🟡 **Reduce** Banking allocation — sell partial ICICI Bank\n3. 🟢 **Add** HUL or ITC for FMCG exposure\n4. 🟢 **Hold** Tata Steel — momentum is strong, trail SL at ₹145\n\n**Estimated Monthly Alpha: +₹12,500** vs passive Nifty strategy",
  "default": "I can help you analyze any Indian stock or your portfolio. Try asking:\n\n- \"Should I hold Reliance?\"\n- \"Analyze my portfolio\"\n- \"What's the outlook for TATASTEEL?\"\n- \"Is HDFC Bank a good buy?\"\n- \"Generate full portfolio report\"\n\nI'll provide AI-powered insights with confidence scores, technical indicators, and clear reasoning! 🚀",
};

export function getAIResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("reliance")) return chatResponses.reliance;
  if (lower.includes("report")) return generatePortfolioReport();
  if (lower.includes("portfolio") || lower.includes("analyze") || lower.includes("analysis")) return chatResponses.portfolio;
  if (lower.includes("tata") || lower.includes("tatasteel")) {
    return "**Tata Steel (₹157.40)**\n\n📊 **Recommendation: BUY** (Confidence: 78%)\n\n**Technical Indicators:**\n- RSI: 65 (Bullish)\n- MACD: Bullish Crossover\n- 50 DMA: ₹148.20 | 200 DMA: ₹142.50\n- Trend: Strong ↑\n\n**Backtested Performance:**\n- Similar breakout patterns: 18 occurrences in 2 years\n- Success rate: 72%\n- Avg. return on success: +11.5%\n\n**Action Plan:**\n- Entry: ₹157 | Target: ₹175 | Stop-Loss: ₹145\n- Risk/Reward: 1:1.8\n\n**Risk Level: Medium** 🟡\n\n💡 *Strong momentum trade. Enter with 50% position now, add on dips to ₹150.*";
  }
  if (lower.includes("hdfc") || lower.includes("bank")) {
    return "**HDFC Bank (₹1,672.80)**\n\n📊 **Recommendation: BUY** (Confidence: 74%)\n\n**Technical Indicators:**\n- RSI: 55 (Neutral)\n- MACD: Bullish\n- Cup & Handle pattern forming\n\n**Risk Level: Low** 🟢\n\n**Action Plan:**\n- Entry: ₹1,670 | Target: ₹1,800 | Stop-Loss: ₹1,620\n\n💡 *Core portfolio stock. Accumulate on dips below ₹1,650.*";
  }
  if (lower.includes("infy") || lower.includes("infosys")) {
    return "**Infosys (₹1,435.20)**\n\n📊 **Recommendation: WATCH** (Confidence: 65%)\n\n**Technical Indicators:**\n- RSI: 38 (Nearing oversold)\n- 200-DMA support at ₹1,410\n\n**Risk Level: Medium** 🟡\n\n💡 *Wait for confirmation of support at ₹1,420 before entering. If broken, next support at ₹1,350.*";
  }
  return chatResponses.default;
}

function generatePortfolioReport(): string {
  const totalInvested = defaultPortfolio.reduce((s, p) => s + p.qty * p.avgPrice, 0);
  const totalCurrent = defaultPortfolio.reduce((s, p) => s + p.qty * p.currentPrice, 0);
  const pnl = totalCurrent - totalInvested;
  const pnlPct = ((pnl / totalInvested) * 100).toFixed(2);

  const sectors: Record<string, number> = {};
  defaultPortfolio.forEach(p => {
    const val = p.qty * p.currentPrice;
    sectors[p.sector] = (sectors[p.sector] || 0) + val;
  });

  let sectorBreakdown = "";
  Object.entries(sectors).sort((a, b) => b[1] - a[1]).forEach(([sector, val]) => {
    const pct = ((val / totalCurrent) * 100).toFixed(1);
    const bar = Number(pct) > 30 ? "⚠️" : "✅";
    sectorBreakdown += `- ${sector}: ${pct}% ${bar}\n`;
  });

  return `# 📋 Full Portfolio Report\n\n**Generated by AlphaSense AI**\n\n---\n\n## Portfolio Summary\n- **Total Invested:** ₹${totalInvested.toLocaleString()}\n- **Current Value:** ₹${totalCurrent.toLocaleString()}\n- **P&L:** ${pnl >= 0 ? "+" : ""}₹${Math.abs(pnl).toLocaleString()} (${pnlPct}%)\n\n## Diversification Score: 68/100\n\n## Sector Allocation\n${sectorBreakdown}\n## Risk Assessment\n- **Overall Risk:** Medium\n- **Concentration Risk:** High in Banking\n- **Volatility Score:** 0.72\n\n## AI Recommendations\n1. **Reduce** Banking exposure from 35% → 25%\n2. **Add** FMCG (HUL/ITC) for stability\n3. **Hold** Reliance — core holding\n4. **Trail SL** on Tata Steel at ₹145\n5. **Watch** Infosys for bounce at ₹1,420\n\n## Estimated Impact\n- **Monthly Alpha:** +₹12,500 vs passive\n- **Risk Reduction:** -18% with rebalancing\n- **Projected Annual Return:** +16.5%\n\n---\n*Report generated on ${new Date().toLocaleDateString("en-IN")}*`;
}

export const impactMetrics = [
  { label: "Time Saved Daily", value: "2-3 hrs", description: "vs manual research", icon: "clock" },
  { label: "Signal Accuracy", value: "73%", description: "backtested over 2 years", icon: "target" },
  { label: "Active Signals", value: "24", description: "across NSE/BSE", icon: "zap" },
  { label: "Stocks Tracked", value: "500+", description: "real-time monitoring", icon: "eye" },
];

export const watchlist = [
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2847.5, change: 2.1 },
  { symbol: "TATASTEEL", name: "Tata Steel", price: 157.4, change: 4.2 },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1672.8, change: 1.5 },
  { symbol: "INFY", name: "Infosys", price: 1435.2, change: -0.8 },
  { symbol: "TCS", name: "Tata Consultancy", price: 3892.4, change: -0.59 },
];
