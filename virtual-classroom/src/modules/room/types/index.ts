export interface RoomData {
  id: string;
  name: string;
  instructor: string;
  participantCount?: number;
  isOwner?: boolean;
}