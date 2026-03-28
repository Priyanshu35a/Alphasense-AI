import { Newspaper } from "lucide-react";

export default function NewsSentiment() {
  return (
    <div>
      <h2 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
        <Newspaper className="w-4 h-4 text-primary" />
        Market Sentiment
      </h2>
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <p className="text-muted-foreground">News sentiment analysis coming soon</p>
      </div>
    </div>
  );
}
