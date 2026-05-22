import { Button } from '@/shared/ui/Button';
import { Mic, MicOff, Video as VideoIcon, MonitorUp, PhoneOff, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Room = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gray-950 flex flex-col text-white">
      <main className="flex-1 p-4 flex gap-4 overflow-hidden">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          <div className="bg-gray-800 rounded-xl overflow-hidden relative border border-gray-700 flex items-center justify-center">
            <div className="h-20 w-20 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-bold">
              J
            </div>
            <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-md text-sm backdrop-blur-sm">
              Juan Pérez (Tú)
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl overflow-hidden relative border border-gray-700 flex items-center justify-center">
            <div className="h-20 w-20 bg-green-600 rounded-full flex items-center justify-center text-3xl font-bold">
              M
            </div>
            <div className="absolute top-4 right-4 bg-red-500 rounded-full p-1">
              <MicOff className="h-4 w-4" />
            </div>
            <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-md text-sm backdrop-blur-sm">
              María López
            </div>
          </div>
        </div>

        <aside className="w-80 bg-gray-900 rounded-xl border border-gray-800 hidden lg:flex flex-col">
          <div className="p-4 border-b border-gray-800 font-medium flex justify-between items-center">
            Mensajes de la llamada
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="text-sm">
              <span className="font-bold text-blue-400">Juan: </span> Hola a todos, la clase está por comenzar.
            </div>
          </div>
          <div className="p-4 border-t border-gray-800">
            <input 
              type="text" 
              placeholder="Enviar un mensaje..." 
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
            />
          </div>
        </aside>
      </main>

      <footer className="h-20 bg-gray-900 border-t border-gray-800 flex items-center justify-between px-4 sm:px-6">
        <div className="w-1/4 sm:w-1/3 text-xs sm:text-sm font-medium truncate pr-2">10:30 AM | Matemáticas</div>
        
        <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-center">
          <Button variant="secondary" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 p-0 border-gray-700 hover:bg-gray-700" aria-label="Alternar micrófono">
            <Mic className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button variant="secondary" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 p-0 border-gray-700 hover:bg-gray-700" aria-label="Alternar cámara">
            <VideoIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button variant="secondary" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 p-0 border-gray-700 hover:bg-gray-700" aria-label="Compartir pantalla">
            <MonitorUp className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button 
            className="rounded-full h-10 sm:h-12 px-4 sm:px-6 bg-red-600 hover:bg-red-700 text-white shadow-none"
            onClick={() => navigate('/dashboard')}
          >
            <PhoneOff className="h-4 w-4 sm:h-5 sm:w-5 sm:mr-2" /> <span className="hidden sm:inline">Salir</span>
          </Button>
        </div>

        <div className="w-1/4 sm:w-1/3 flex justify-end">
          <Button variant="ghost" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 p-0 lg:hidden" aria-label="Abrir chat">
            <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
};
