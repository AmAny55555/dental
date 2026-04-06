import { Clock3, FileText, UserRound } from "lucide-react";
import { RecentAppointment } from "@/types/dashboard";

type RecentAppointmentsProps = {
  appointments: RecentAppointment[];
};

export default function RecentAppointments({
  appointments,
}: RecentAppointmentsProps) {
  return (
    <div className="h-full bg-white border border-[#e3e2e0] rounded-xl overflow-hidden shadow-sm flex flex-col">
      <div className="p-6 border-b border-[#e3e2e0]/50 bg-[#faf9f7] flex justify-between items-center">
        <h3 className="text-lg font-bold text-[#00150f]">آخر المواعيد</h3>
        <button className="text-[10px] font-bold text-[#2b6954] hover:underline uppercase tracking-wide">عرض الكل</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-[#faf9f7] border-b border-[#e3e2e0]">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-[#717975] tracking-[0.1em]">المريض</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-[#717975] tracking-[0.1em]">ملاحظات</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-[#717975] tracking-[0.1em]">الحالة</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-[#717975] tracking-[0.1em] text-left">الوقت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e3e2e0]">
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-[#717975] font-medium text-sm">
                  لا توجد مواعيد مضافة مؤخراً
                </td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-[#faf9f7] transition-colors cursor-pointer group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#00150f]/5 flex items-center justify-center text-[#00150f] shrink-0 border border-[#00150f]/10 group-hover:bg-[#2b6954] group-hover:text-white transition-colors">
                        <UserRound className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#00150f]">{appointment.patient_name}</p>
                        <p className="text-[10px] text-[#717975] mt-1">ID: #{appointment.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs text-[#717975] max-w-[200px] truncate">
                    {appointment.notes || "لا توجد ملاحظات"}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wide border ${
                      appointment.status === "تم"
                        ? "bg-[#2b6954] text-white border-[#2b6954]"
                        : appointment.status === "مؤجل"
                        ? "bg-[#ffdf9f] text-[#5c4300] border-[#ffdf9f]"
                        : "bg-[#e3e2e0]/50 text-[#414845] border-[#e3e2e0]"
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-[#00150f] text-left">
                    <div className="flex items-center justify-end gap-2">
                       {appointment.time}
                       <Clock3 className="w-4 h-4 text-[#717975]" />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}