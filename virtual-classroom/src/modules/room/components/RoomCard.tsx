import { Users, Settings } from "lucide-react";

import type { RoomData } from "../types";

interface Props {
  room: RoomData;
  onEnter: (id: string) => void;
}

export const RoomCard = ({ room, onEnter }: Props) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-900">{room.name}</h3>

        {room.isOwner && (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-semibold text-blue-700">
            OWNER
          </span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Users size={14} />

          <span>{room.participantCount ?? 0} participantes</span>
        </div>

        <div className="text-sm text-slate-500">
          Instructor: {room.instructor}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEnter(room.id)}
          className="flex-1 rounded-lg bg-[#1B3D6F] py-2 text-sm font-semibold text-white transition hover:bg-[#163261]"
        >
          Entrar
        </button>

        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-100">
          <Settings size={16} />
        </button>
      </div>
    </div>
  );
};
