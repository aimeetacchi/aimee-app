"use client";
import { useEffect, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import { useTwilio } from "../../hooks/useTwilio";

const Phone = () => {
	const [isClient, setIsClient] = useState(false);
	const socket = useSocket();
	const device = useTwilio();
	const [calls, setCalls] = useState<{ sid: string; from: string }[]>(() => []);

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (!isClient || !socket) return;

		socket.on("new-call", (data) => {
			setCalls((prev) => [...prev, { sid: data.sid, from: data.from }]);
		});

		return () => {
			socket.off("new-call");
		};
	}, [isClient, socket]);

	useEffect(() => {
		if (!isClient || !device) return;

		const handleIncomingCall = (conn: any) => {
			console.log("Incoming call:", conn.parameters.From);
			conn.accept();
		};

		const handleConnect = () => console.log("Call connected");
		const handleDisconnect = () => console.log("Call ended");

		device.on("incoming", handleIncomingCall);
		device.on("connect", handleConnect);
		device.on("disconnect", handleDisconnect);

		return () => {
			device.off("incoming", handleIncomingCall);
			device.off("connect", handleConnect);
			device.off("disconnect", handleDisconnect);
			device.destroy();
		};
	}, [isClient, device]);

	const answerCall = async (callSid: string) => {
		try {
			await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/answer-call`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ callSid }),
			});

			if (device) {
				device.connect({ params: { To: callSid } });
			}
		} catch (error) {
			console.error("Error answering call:", error);
		}
	};

	if (!isClient) return null;

	return (
		<div className="p-4">
			<h1 className="text-xl font-bold">Calls</h1>
			{calls.length === 0 && <p>No incoming calls</p>}
			{calls.map((call) => (
				<div key={call.sid} className="p-2 border my-2">
					<p>Call from: {call.from}</p>
					<button
						onClick={() => answerCall(call.sid)}
						className="bg-green-500 text-white px-4 py-2 rounded"
					>
						Answer
					</button>
				</div>
			))}
		</div>
	);
};

export default Phone;
