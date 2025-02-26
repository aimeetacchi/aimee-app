import { useEffect, useState } from "react";
import { Device } from "@twilio/voice-sdk";
import { getTwilioToken } from "../utils/getTwilioToken";

export const useTwilio = () => {
	const [device, setDevice] = useState<Device | null>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const setupTwilio = async () => {
			const token = await getTwilioToken();
			if (!token) return;

			const creatingDevice = new Device(token, {
				appName: "Call App",
				appVersion: "1.0.0",
			});

			creatingDevice.on("incoming", (connection) => {
				console.log("Incoming call from:", connection.parameters.From);
				if (window.confirm("Accept incoming call?")) {
					connection.accept();
				} else {
					connection.reject();
				}
			});

			setDevice(creatingDevice);
		};

		setupTwilio();
	}, []);

	return device;
};
