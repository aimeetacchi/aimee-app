// app/api/travel/route.ts
import { NextRequest } from "next/server";
import { z } from "zod";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { openai } from "@/lib/ai";

export const runtime = "edge";
export const maxDuration = 60;

const Plan = z.object({
	destination: z.string().min(2),
	month: z.number().int().min(1).max(12).optional(),
	days: z.number().int().min(1).max(21).optional(),
	interests: z.array(z.string()).optional(),
	budgetLevel: z.enum(["budget", "mid", "premium"]).optional(),
});

const SYSTEM = `
You are TripTailor, a friendly planner. When a user asks about a place,
return concise, practical guidance with the following sections:
1) Best time to go (by month) and why
2) Where to stay (2–3 great base areas, with vibes)
3) 3–7 day itinerary ideas (realistic timings)
4) Food & culture highlights (local dishes, etiquette)
5) Getting around (transit cards, walking time expectations)
6) Safety & scams (brief, pragmatic)
7) Budget notes in GBP (ranges; assumptions)
Keep it factual, modern, and formatted with short headings + bullet lists.
`;

export async function POST(req: NextRequest) {
	const body = await req.json().catch(() => ({} as any));
	const { plan, messages = [] as UIMessage[] } = body as {
		plan?: z.infer<typeof Plan>;
		messages?: UIMessage[];
	};

	const parsed = Plan.safeParse(plan ?? {});
	if (!parsed.success) {
		return new Response("Invalid plan payload", { status: 400 });
	}

	const {
		destination,
		month,
		days = 5,
		interests = [],
		budgetLevel = "mid",
	} = parsed.data;

	const seed = [
		`Destination: ${destination}`,
		`Preferred month: ${month ?? "unspecified"}`,
		`Trip length: ${days} days`,
		`Interests: ${interests.join(", ") || "general sightseeing"}`,
		`Budget level: ${budgetLevel}`,
	].join("\n");

	const result = streamText({
		model: openai("gpt-4o-mini"),
		system: SYSTEM,
		messages: [
			{ role: "system", content: `PLAN CONTEXT\n${seed}\n----` },
			...convertToModelMessages(messages),
			{ role: "user", content: `Help me plan a trip to ${destination}.` },
		],
		temperature: 0.4,
	});

	// ✅ AI SDK v5 UI stream helper
	return result.toUIMessageStreamResponse();
}
