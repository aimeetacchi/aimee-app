export const getTwilioToken = async () => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/twilio-token`
		);
		const data = await response.json();
		return data.token;
	} catch (error) {
		console.error("Failed to get Twilio token:", error);
		return null;
	}
};
