import { useState } from "react";
import { watchlist as initialWatchlist } from "@/lib/mockData";
import { motion } from "framer-motion";
import { Eye, Plus, Trash2, TrendingUp, TrendingDown, Bell } from "lucide-react";

export default function Watchlist() {
  const [items, setItems] = useState(initialWatchlist);
  const [newSymbol, setNewSymbol] = useState("");
  const [notifs, setNotifs] = useState<Set<string>>(new Set());

  const addStock = () => {
    if (!newSymbol.trim()) return;
    const sym = newSymbol.toUpperCase();
    if (items.find((i) => i.symbol === sym)) return;
    setItems([...items, { symbol: sym, name: sym, price: 100 + Math.random() * 2000, change: (Math.random() - 0.4) * 5 }]);
    setNewSymbol("");
  };

  const removeStock = (symbol: string) => setItems(items.filter((i) => i.symbol !== symbol));

  const toggleNotif = (symbol: string) => {
    const next = new Set(notifs);
    if (next.has(symbol)) {
      next.delete(symbol);
    } else {
      next.add(symbol);
    }
    setNotifs(next);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl font-display font-bold text-foreground flex items-center gap-2">
          <Eye className="w-7 h-7 text-primary" /> Watchlist
        </motion.h1>
        <p className="text-sm text-muted-foreground mt-1">Track your favorite stocks</p>
      </div>

      {/* Add stock */}
      <div className="flex gap-2">
        <input
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addStock()}
          placeholder="Add stock symbol (e.g. WIPRO)"
          className="flex-1 max-w-xs bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button onClick={addStock} className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center gap-1.5 text-sm font-medium">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {/* List */}
      <div className="space-y-2">
        {items.map((item, i) => (
          <motion.div
            key={item.symbol}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border bg-card p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.change >= 0 ? "bg-gain/10" : "bg-loss/10"}`}>
                {item.change >= 0 ? <TrendingUp className="w-5 h-5 text-gain" /> : <TrendingDown className="w-5 h-5 text-loss" />}
              </div>
              <div>
                <p className="font-semibold text-card-foreground">{item.symbol}</p>
                <p className="text-xs text-muted-foreground">{item.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium text-card-foreground">₹{item.price.toFixed(2)}</p>
                <p className={`text-xs font-semibold ${item.change >= 0 ? "text-gain" : "text-loss"}`}>
                  {item.change >= 0 ? "+" : ""}{item.change.toFixed(2)}%
                </p>
              </div>
              <button
                onClick={() => toggleNotif(item.symbol)}
                className={`p-2 rounded-lg transition-colors ${notifs.has(item.symbol) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}
              >
                <Bell className="w-4 h-4" />
              </button>
              <button onClick={() => removeStock(item.symbol)} className="p-2 text-muted-foreground hover:text-loss hover:bg-loss/10 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
