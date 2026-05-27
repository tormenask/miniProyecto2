const db = require("../config/firebase");

class RoomService {
    async createRoom(data) {
        const roomData = {
            name: data.name,
            hostId: data.hostId,
            participants: [],
            createdAt: new Date(),
        };

        const roomRef = await db.collection("rooms").add(roomData);

        return {
            id: roomRef.id,
            ...roomData,
        };
    }

    async getRooms() {
        const snapshot = await db
            .collection("rooms")
            .orderBy("createdAt", "desc")
            .get();

        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    }

    // Obtener sala por ID
    async getRoomById(roomId) {
        const roomDoc = await db.collection("rooms").doc(roomId).get();

        if (!roomDoc.exists) {
            throw new Error("Sala no encontrada");
        }

        return {
            id: roomDoc.id,
            ...roomDoc.data(),
        };
    }

    // Unirse a sala
    async joinRoom(roomId, userId) {
        const roomRef = db.collection("rooms").doc(roomId);

        const roomDoc = await roomRef.get();

        if (!roomDoc.exists) {
            throw new Error("Sala no encontrada");
        }

        const roomData = roomDoc.data();

        const participants = roomData.participants || [];

        if (!participants.includes(userId)) {
            participants.push(userId);

            await roomRef.update({
                participants,
            });
        }

        return {
            id: roomDoc.id,
            ...roomData,
            participants,
        };
    }

    // Salir de sala
    async leaveRoom(roomId, userId) {
        const roomRef = db.collection("rooms").doc(roomId);

        const roomDoc = await roomRef.get();

        if (!roomDoc.exists) {
            throw new Error("Sala no encontrada");
        }

        const roomData = roomDoc.data();

        const updatedParticipants = (roomData.participants || []).filter(
            (participant) => participant !== userId
        );

        await roomRef.update({
            participants: updatedParticipants,
        });

        return {
            id: roomDoc.id,
            ...roomData,
            participants: updatedParticipants,
        };
    }

    // Eliminar sala
    async deleteRoom(roomId) {
        const roomRef = db.collection("rooms").doc(roomId);

        const roomDoc = await roomRef.get();

        if (!roomDoc.exists) {
            throw new Error("Sala no encontrada");
        }

        await roomRef.delete();

        return {
            message: "Sala eliminada correctamente",
        };
    }
}

module.exports = new RoomService();