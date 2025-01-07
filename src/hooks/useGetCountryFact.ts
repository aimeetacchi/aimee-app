import { SelectOptionType } from "@/utils/types/types";
import { useEffect, useState } from "react";

export const UseCountryFact = () => {
  const [selectedCountry, setSelectedCountry] = useState<
    SelectOptionType | undefined
  >(undefined);
  const [countryFact, setCountryFact] = useState<string | null>(null);
  const [followUpAnswer, setFollowUpAnswer] = useState<string | null>(null);

  const handleCountrySelect = async (country: string) => {
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedCountry: country }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch country fact");
      }

      const data = await response.json();
      setCountryFact(data.output.content);
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "Failed to fetch country fact"
      );
    }
  };

  const askFollowUpQuestion = async (question: string) => {
    if (!countryFact) return;

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedCountry: null,
          previousResponse: countryFact,
          followUpQuestion: question,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setFollowUpAnswer(data.output.content);
    } catch (error) {
      console.error(
        error instanceof Error
          ? error.message
          : "Failed to get answer for follow-up question"
      );
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      handleCountrySelect(selectedCountry.value);
    }
  }, [selectedCountry]);

  return {
    countryFact,
    setCountryFact,
    setSelectedCountry,
    selectedCountry,
    followUpAnswer,
    askFollowUpQuestion,
    setFollowUpAnswer,
  };
};
