import { useEffect, useState } from "react";

export const useCountries = (url: string) => {
  const [countriesData, setCountries] = useState<Country[]>([]);
  type Country = {
    name: {
      common: string;
      official: string;
      nativeName?: Record<
        string,
        {
          official: string;
          common: string;
        }
      >;
    };
    tld?: string[];
    cca2: string;
    ccn3?: string;
    cca3: string;
    independent?: boolean;
    status: string;
    unMember: boolean;
    currencies?: Record<
      string,
      {
        name: string;
        symbol: string;
      }
    >;
    idd?: {
      root?: string;
      suffixes?: string[];
    };
    capital?: string[];
    altSpellings: string[];
    region: string;
    subregion?: string;
    languages?: Record<string, string>;
    translations: Record<
      string,
      {
        official: string;
        common: string;
      }
    >;
    latlng: [number, number];
    landlocked: boolean;
    borders?: string[];
    area: number;
    demonyms?: Record<
      string,
      {
        f: string;
        m: string;
      }
    >;
    flag: string;
    maps: {
      googleMaps: string;
      openStreetMaps: string;
    };
    population: number;
    car?: {
      signs?: string[];
      side: string;
    };
    timezones: string[];
    continents: string[];
    flags: {
      png: string;
      svg: string;
    };
    coatOfArms?: {
      png?: string;
      svg?: string;
    };
    startOfWeek: string;
    capitalInfo?: {
      latlng?: [number, number];
    };
    postalCode?: {
      format: string;
      regex?: string;
    };
  };
  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();

        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCountries();
  }, [url]);

  return { countriesData };
};
