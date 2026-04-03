export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-cyan-50 to-sky-100">
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute h-20 w-20 animate-spin rounded-full border-4 border-cyan-100 border-t-cyan-600" />
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-600 text-2xl text-white shadow-lg">
            🦷
          </div>
        </div>

        <div className="space-y-2 text-center">
          <h2 className="text-xl font-bold text-slate-800">جاري التحميل...</h2>
          <p className="text-sm text-slate-500">
            يتم تجهيز نظام إدارة العيادة
          </p>
        </div>
      </div>
    </div>
  );
}