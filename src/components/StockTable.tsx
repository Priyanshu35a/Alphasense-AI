import { topStocks } from "@/lib/mockData";
import { motion } from "framer-motion";

export default function StockTable() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="font-display font-semibold text-card-foreground text-sm">Top Movers</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-xs">
              <th className="text-left px-4 py-2.5 font-medium">Stock</th>
              <th className="text-right px-4 py-2.5 font-medium">Price</th>
              <th className="text-right px-4 py-2.5 font-medium">Change</th>
              <th className="text-right px-4 py-2.5 font-medium hidden sm:table-cell">Volume</th>
              <th className="text-right px-4 py-2.5 font-medium hidden md:table-cell">Sector</th>
            </tr>
          </thead>
          <tbody>
            {topStocks.map((stock, i) => (
              <motion.tr
                key={stock.symbol}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-2.5">
                  <div>
                    <span className="font-semibold text-card-foreground">{stock.symbol}</span>
                    <p className="text-xs text-muted-foreground">{stock.name}</p>
                  </div>
                </td>
                <td className="text-right px-4 py-2.5 font-medium text-card-foreground">₹{stock.price.toLocaleString()}</td>
                <td className={`text-right px-4 py-2.5 font-semibold ${stock.changePercent >= 0 ? "text-gain" : "text-loss"}`}>
                  {stock.changePercent >= 0 ? "+" : ""}{stock.changePercent}%
                </td>
                <td className="text-right px-4 py-2.5 text-muted-foreground hidden sm:table-cell">{stock.volume}</td>
                <td className="text-right px-4 py-2.5 hidden md:table-cell">
                  <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">{stock.sector}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
