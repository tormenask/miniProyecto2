import { Video } from "lucide-react";

export const EmptyRooms = () => {
  return (
    <div className="flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-10 text-center transition-colors hover:border-slate-300 hover:bg-slate-50">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <Video size={26} strokeWidth={1.5} className="text-slate-400" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-slate-600">
          No hay salas programadas
        </p>
        <p className="text-xs text-slate-400">
          Las salas en las que participes aparecerán aquí
        </p>
      </div>
    </div>
  );
};