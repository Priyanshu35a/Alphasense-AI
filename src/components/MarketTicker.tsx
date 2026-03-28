import { marketOverview } from "@/lib/mockData";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function MarketTicker() {
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-thin pb-1">
      {marketOverview.map((item) => (
        <div key={item.symbol} className="flex-shrink-0 rounded-xl border border-border bg-card px-4 py-3 min-w-[200px]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">{item.name}</span>
            {item.changePercent >= 0 ? (
              <TrendingUp className="w-3.5 h-3.5 text-gain" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-loss" />
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-card-foreground">{item.price.toLocaleString()}</span>
            <span className={`text-xs font-semibold ${item.changePercent >= 0 ? "text-gain" : "text-loss"}`}>
              {item.changePercent >= 0 ? "+" : ""}{item.changePercent}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
