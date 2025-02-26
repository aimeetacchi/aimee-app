import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: Request) {
	const body = await req.json();
	const { selectedCountry, previousResponse, followUpQuestion } = body;

	// Handle initial country fact request

	// Handle follow-up question
	if (followUpQuestion && previousResponse) {
		console.log("previousResponse", previousResponse);
		console.log("followUpQuestion", followUpQuestion);

		const completion = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{
					role: "system",
					content:
						"You are a helpful assistant that provides interesting facts about countries.",
				},
				{
					role: "assistant",
					content: previousResponse,
				},
				{
					role: "user",
					content: followUpQuestion,
				},
			],
		});

		const theResponse = completion.choices[0].message;

		return NextResponse.json({ output: theResponse }, { status: 200 });
	}

	if (selectedCountry) {
		if (!selectedCountry) {
			return NextResponse.json(
				{ error: "Selected country is required" },
				{ status: 400 }
			);
		}

		const completion = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			// store: true,
			messages: [
				{
					role: "system",
					content:
						"You are a helpful assistant that provides interesting facts about countries.",
				},
				{
					role: "user",
					content: `Give me an interesting fact about ${selectedCountry}.`,
				},
			],
		});

		const theResponse = completion.choices[0].message;

		return NextResponse.json({ output: theResponse }, { status: 200 });
	}

	return NextResponse.json(
		{ error: "Invalid request parameters" },
		{ status: 400 }
	);
}
