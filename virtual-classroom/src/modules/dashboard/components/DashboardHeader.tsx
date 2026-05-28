import { Video, LogOut, UserCircle } from "lucide-react";

import { useAuth } from "@/modules/auth/hooks/useAuth";

export const DashboardHeader = () => {
  const { user, logout } = useAuth();

  const fullName = `${user?.names ?? ""} ${user?.lastNames ?? ""}`.trim();

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-slate-200 bg-white px-8">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1B3D6F] text-white">
            <Video size={20} />
          </div>

          <span className="text-lg font-bold tracking-tight text-slate-900">
            StudyRoom
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-slate-900">
              {fullName || "Usuario"}
            </p>

            <p className="text-xs text-slate-500">
              {user?.role ?? "PARTICIPANT"}
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-blue-200 bg-blue-50 text-blue-600">
            {user?.avatar ? (
              <img
                src={
                  user.avatar ||
                  `https://api.dicebear.com/9.x/initials/svg?seed=${user.username}`
                }
                alt={user.username}
                referrerPolicy="no-referrer"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <UserCircle size={20} />
            )}
          </div>

          <button
            onClick={logout}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-red-500"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
