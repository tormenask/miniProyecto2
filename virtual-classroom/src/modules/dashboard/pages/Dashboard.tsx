import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { useAuth } from "@/modules/auth/store/AuthContext";
import { Video, Plus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "@/shared/constants/api";

interface RoomData {
  id: string;
  name: string;
  instructor: string;
}

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<RoomData[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("virtual_class_token");

    fetch(API_ROUTES.ROOMS.GET_ALL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })

      .then((data) => {
        console.log("Fetched rooms:", data);

        setRooms(data.data);
      })

      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <header className="border-b bg-white dark:bg-gray-900 dark:border-gray-800 p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Video className="text-primary h-6 w-6" />
          <h1 className="text-xl font-bold dark:text-white">VirtualClass</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-right hidden sm:block">
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {user
                ? `${user.names || "Usuario"} ${user.lastNames || ""}`
                : "Usuario Mock"}
            </p>
            
            <p className="text-gray-500 dark:text-gray-400">
              {user?.role || "PARTICIPANT"}
            </p>
          </div>
          <img src={user?.avatar || ""} alt="Logo" className="h-8 w-8" style={{borderRadius: '50%'}}/>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Cerrar sesión"
            onClick={() => logout()}
          >
            <LogOut style={{color:"#fff"}}className="h-5 w-5" />
          </Button>

        </div>
      </header>

      <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold dark:text-white">Mis Salas</h2>
          {(!user || user.role === "ADMIN") && (
            <Button variant="outline" style={{color:"#fff"}} className="gap-2">
              <Plus style={{color:"#fff"}} className="h-4 w-4" /> Crear Sala
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card
              key={room.id}
              className="hover:shadow-md transition-all hover:-translate-y-1 group"
            >
              <CardHeader>
                <CardTitle className="text-lg">{room.name}</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {room.instructor}
                </p>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full gap-2"
                  onClick={() => navigate(`/room/${room.id}`)}
                >
                  <Video className="h-4 w-4" /> Unirse a la sala
                </Button>
              </CardContent>
            </Card>
          ))}

          <Card className="hover:shadow-md transition-all hover:-translate-y-1 group border-dashed border-2 bg-transparent dark:bg-transparent flex flex-col items-center justify-center p-6 min-h-[200px]">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <Video className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No hay más salas programadas</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};
