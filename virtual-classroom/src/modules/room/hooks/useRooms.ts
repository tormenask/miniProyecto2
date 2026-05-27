import { useEffect, useState } from "react";

import { getRooms } from "../services/room.service";
import type { RoomData } from "../types";

export const useRooms = () => {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRooms()
      .then(setRooms)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return {
    rooms,
    loading,
  };
};
