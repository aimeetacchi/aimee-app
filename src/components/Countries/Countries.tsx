"use client";
import { useCountries } from "@/hooks/useCountries";
import { UseCountryFact } from "@/hooks/useGetCountryFact";
import { latoSans } from "@/utils/fonts";
import { SelectOptionType } from "@/utils/types/types";
import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import react-select to ensure it only runs on the client
const Select = dynamic(() => import("react-select"), { ssr: false });

const formatOptionValue = (value: string): string => {
  return value.toLowerCase().trim().replace(/\s+/g, "-");
};

const Countries = () => {
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const { countriesData } = useCountries("https://restcountries.com/v3.1/all");
  const {
    countryFact,
    setSelectedCountry,
    setCountryFact,
    selectedCountry,
    followUpAnswer,
    askFollowUpQuestion,
    setFollowUpAnswer,
  } = UseCountryFact();

  const options = countriesData.map((country) => ({
    value: formatOptionValue(country.name.common),
    label: country.name.common,
  }));

  const handleFollowUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    askFollowUpQuestion(followUpQuestion);
    setFollowUpQuestion("");
  };

  const clearChat = () => {
    setCountryFact(null);
    setFollowUpAnswer(null);
    setSelectedCountry(undefined);
  };

  return (
    <>
      <h2 className={`${latoSans.className} font-bold text-[34px] mb-3`}>
        Tell me a fact about the selected country?
      </h2>

      <Select
        name="select"
        className="mb-3"
        options={options}
        defaultValue={options[47]}
        value={selectedCountry ? selectedCountry : options[47]}
        onChange={(option) => {
          setSelectedCountry(option as SelectOptionType);
          setCountryFact(null);
        }}
      />

      <>
        {selectedCountry
          ? selectedCountry && (
              <div className="mb-5">
                <h2
                  className={`${latoSans.className} font-bold text-[34px] mb-3`}
                >
                  Fact about {selectedCountry.value}:
                </h2>
                <p>{countryFact || "getting your fact..."}</p>
              </div>
            )
          : ""}
      </>

      {countryFact && (
        <>
          <form className="flex my-5 " onSubmit={handleFollowUpSubmit}>
            <input
              className="p-2 w-full"
              type="text"
              value={followUpQuestion}
              onChange={(e) => setFollowUpQuestion(e.target.value)}
              placeholder="Ask a follow-up question..."
            />
            <button
              className="p-3 bg-blue-600 text-white rounded-sm w-32"
              type="submit"
            >
              Ask
            </button>
          </form>

          {followUpAnswer && (
            <div className="mb-8 mt-10">
              <h4
                className={`${latoSans.className} font-bold text-[24px] mb-3`}
              >
                Answer to your follow-up question:
              </h4>
              <p>{followUpAnswer || "getting your follow up answer..."}</p>
            </div>
          )}
        </>
      )}

      {countryFact && (
        <button
          onClick={clearChat}
          className="bg-red-600 text-white p-3 rounded-md"
        >
          Clear Chat
        </button>
      )}
    </>
  );
};

export default Countries;
