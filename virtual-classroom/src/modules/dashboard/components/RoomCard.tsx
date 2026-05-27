import { Users, Settings, LogIn } from "lucide-react";
import type { RoomData } from "../../room/types";

interface Props {
  room: RoomData;
  onEnter: (id: string) => void;
}

export const RoomCard = ({ room, onEnter }: Props) => {
  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md">
      {/* Top accent bar */}
      <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-[#1B3D6F] to-[#2563eb] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold leading-snug text-slate-900">
          {room.name}
        </h3>
        {room.isOwner && (
          <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-600 ring-1 ring-blue-100">
            Owner
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Users size={13} className="shrink-0 text-slate-400" />
          <span>{room.participantCount ?? 0} participantes</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
          <span className="truncate">
            Instructor:{" "}
            <span className="font-medium text-slate-700">
              {room.instructor}
            </span>
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-slate-100" />

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onEnter(room.id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#1B3D6F] py-2 text-xs font-semibold text-white transition-all duration-150 hover:bg-[#163261] active:scale-[0.98]"
        >
          <LogIn size={13} />
          Entrar
        </button>

        <button
          aria-label="Configuración de sala"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-400 transition-all duration-150 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-600 active:scale-[0.97]"
        >
          <Settings size={15} />
        </button>
      </div>
    </div>
  );
};
