import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value?: number;
  icon: LucideIcon;
  hint?: string;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  hint,
}: StatCardProps) {
  return (
    <Card className="overflow-hidden rounded-[28px] border-white/70 bg-white/80 shadow-[0_20px_80px_-25px_rgba(15,23,42,0.18)] backdrop-blur">
      <CardContent className="relative p-5">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-sky-500/10 opacity-80" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="space-y-2 text-right">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              {value ?? "--"}
            </h2>
            {hint && <p className="text-xs text-slate-400">{hint}</p>}
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-cyan-600 to-sky-700 p-3 text-white shadow-lg">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}