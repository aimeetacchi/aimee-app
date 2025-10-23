"use client";

import { useChat } from "@ai-sdk/react"; // ← not "ai/react"
import { DefaultChatTransport } from "ai";
import type { UIMessage } from "ai";
import { useState } from "react";

function getTextFromMessage(m: UIMessage) {
	return m.parts
		.filter((p): p is { type: "text"; text: string } => p.type === "text")
		.map((p) => p.text)
		.join("");
}

const TravelSearch = () => {
	const [destination, setDestination] = useState("");
	const [month, setMonth] = useState<number | "">("");
	const [days, setDays] = useState<number | "">(5);
	const [interests, setInterests] = useState("food, nature, culture");
	const [budgetLevel, setBudgetLevel] = useState<"budget" | "mid" | "premium">(
		"mid"
	);
	const [input, setInput] = useState("");

	const { messages, sendMessage, status, error } = useChat({
		// ✅ configure the endpoint via transport (not `api`)
		transport: new DefaultChatTransport({ api: "/api/travel" }),
		id: "travel",
	});
	return (
		<div>
			<h2 className="font-bold text-[34px] mt-20 mb-3">
				Travel Search Component
			</h2>

			{/* ✅ use your states here so they’re not “unused” */}
			<div className="grid gap-2 sm:grid-cols-2">
				<input
					className="border rounded p-2 sm:col-span-2"
					placeholder="Destination (e.g. Kyoto)"
					value={destination}
					onChange={(e) => setDestination(e.target.value)}
				/>
				<input
					className="border rounded p-2"
					type="number"
					min={1}
					max={12}
					placeholder="Month (1–12)"
					value={month}
					onChange={(e) =>
						setMonth(e.target.value === "" ? "" : Number(e.target.value))
					}
				/>
				<input
					className="border rounded p-2"
					type="number"
					min={1}
					max={21}
					placeholder="Days"
					value={days}
					onChange={(e) =>
						setDays(e.target.value === "" ? "" : Number(e.target.value))
					}
				/>
				<input
					className="border rounded p-2 sm:col-span-2"
					placeholder="Interests (comma separated)"
					value={interests}
					onChange={(e) => setInterests(e.target.value)}
				/>
				<select
					className="border rounded p-2 sm:col-span-2"
					value={budgetLevel}
					onChange={(e) => setBudgetLevel(e.target.value as any)}
				>
					<option value="budget">Budget</option>
					<option value="mid">Mid</option>
					<option value="premium">Premium</option>
				</select>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (!destination) return alert("Enter a destination");
					sendMessage(
						{ text: input || `Plan ${days || 5} days in ${destination}` },
						{
							body: {
								plan: {
									destination,
									month: typeof month === "number" ? month : undefined,
									days: typeof days === "number" ? days : undefined,
									interests: interests
										.split(",")
										.map((s) => s.trim())
										.filter(Boolean),
									budgetLevel,
								},
							},
						}
					);
					setInput("");
				}}
				className="flex gap-2"
			>
				<input
					className="flex-1 border rounded p-2"
					placeholder="Ask about your trip…"
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button
					className="border rounded px-4 py-2"
					disabled={status !== "ready"}
				>
					{status === "streaming" ? "Thinking…" : "Send"}
				</button>
			</form>

			<div className="space-y-3">
				{messages.map((m) => (
					<div key={m.id} className="border rounded p-3">
						<div className="text-xs uppercase opacity-60">{m.role}</div>
						<div className="whitespace-pre-wrap">
							{"parts" in m
								? m.parts?.map((p: any, i: number) => (
										<span key={i}>{p.text}</span>
								  ))
								: getTextFromMessage(m)}
						</div>
					</div>
				))}
			</div>
			{error && <p className="text-sm text-red-600">Error: {error.message}</p>}
		</div>
	);
};

export default TravelSearch;
