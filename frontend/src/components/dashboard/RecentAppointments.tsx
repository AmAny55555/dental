import { Clock3, FileText, UserRound } from "lucide-react";
import { Badge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentAppointment } from "@/types/dashboard";

type RecentAppointmentsProps = {
  appointments: RecentAppointment[];
};

function getStatusVariant(status: string) {
  if (status === "تم") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  if (status === "مؤجل") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  return "bg-slate-100 text-slate-700 border-slate-200";
}

export default function RecentAppointments({
  appointments,
}: RecentAppointmentsProps) {
  return (
    <Card className="rounded-[32px] border-white/70 bg-white/80 shadow-[0_20px_80px_-25px_rgba(15,23,42,0.16)] backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-right text-xl font-bold text-slate-900">
          آخر المواعيد
        </CardTitle>
      </CardHeader>

      <CardContent>
        {appointments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center">
            <h3 className="text-base font-semibold text-slate-800">
              لا توجد مواعيد اليوم
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              عند إضافة مواعيد جديدة ستظهر هنا تلقائيًا
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 transition hover:bg-slate-50"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-base font-bold text-slate-900">
                        {appointment.patient_name}
                      </span>
                      <UserRound className="h-4 w-4 text-slate-400" />
                    </div>

                    <div className="flex items-center justify-end gap-2 text-sm text-slate-500">
                      <span>{appointment.time}</span>
                      <Clock3 className="h-4 w-4" />
                    </div>

                    {appointment.notes && (
                      <div className="flex items-start justify-end gap-2 text-sm text-slate-500">
                        <p className="max-w-xl leading-6">{appointment.notes}</p>
                        <FileText className="mt-1 h-4 w-4 shrink-0" />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end md:justify-start">
                    <Badge
                      className={`border ${getStatusVariant(appointment.status)}`}
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}