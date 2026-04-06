import { LucideIcon } from "lucide-react";

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
    <div className="bg-white border-r-4 border-r-[#f9bd22] border-y border-y-[#e3e2e0] border-l border-l-[#e3e2e0] rounded-xl p-5 md:p-6 xl:p-8 flex flex-col justify-between group cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all">
      <div>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[#faf9f7] border border-[#e3e2e0] flex items-center justify-center text-[#00150f] mb-4 md:mb-6 group-hover:bg-[#2b6954] group-hover:text-white transition-colors">
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <p className="text-[#717975] text-[10px] md:text-xs font-bold uppercase tracking-[0.1em]">{title}</p>
      </div>

      <div className="mt-4">
        <h4 className="font-cairo text-3xl md:text-4xl font-black text-[#00150f] break-words">{value ?? "--"}</h4>
        {hint && <p className="text-[10px] text-[#2b6954] font-bold mt-2 pt-1 uppercase flex items-center truncate">{hint}</p>}
      </div>
    </div>
  );
}