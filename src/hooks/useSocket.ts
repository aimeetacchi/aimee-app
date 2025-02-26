import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = () => {
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const newSocket = io(
			process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001"
		);
		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
		};
	}, []);

	return socket;
};
