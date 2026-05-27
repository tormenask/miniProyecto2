import type { RoomData } from "../types";

const API_URL = "/api/rooms";

export const getRooms = async (): Promise<RoomData[]> => {
  const token = localStorage.getItem("virtual_class_token");

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error obteniendo salas");
  }

  const data = await response.json();

  return data.data ?? [];
};
