import { useNavigate } from "react-router-dom";
import {
  Hash,
  Plus,
} from "lucide-react";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useRooms } from "../../room/hooks/useRooms";
import { DashboardHeader } from "../components/DashboardHeader";
import { RoomCard } from "../components/RoomCard";
import { EmptyRooms } from "../components/EmptyRooms";
import { LoadingSkeleton } from "../components/LoadingSkeleton";

export const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const { rooms, loading } = useRooms();

  const isAdmin =
    !user || user.role === "ADMIN";

  return (
    <div className="min-h-screen bg-slate-100">
      <DashboardHeader />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Bienvenido, {user?.names ?? "Usuario"}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Gestiona tus salas de estudio o
            únete a nuevas sesiones
          </p>
        </div>

        {isAdmin && (
          <div className="mb-10 grid gap-4 md:grid-cols-2">
            <button className="flex items-center justify-center gap-2 rounded-xl bg-[#1B3D6F] px-6 py-4 font-semibold text-white transition hover:opacity-90">
              <Plus size={18} />
              Crear Nueva Sala
            </button>

            <button className="flex items-center justify-center gap-2 rounded-xl bg-[#0F6E56] px-6 py-4 font-semibold text-white transition hover:opacity-90">
              <Hash size={18} />
              Unirse con ID
            </button>
          </div>
        )}

        <h2 className="mb-5 text-xl font-bold text-slate-900">
          Mis Salas
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {loading ? (
            <LoadingSkeleton />
          ) : rooms.length > 0 ? (
            rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onEnter={(id) =>
                  navigate(`/room/${id}`)
                }
              />
            ))
          ) : (
            <EmptyRooms />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;