import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/shared/search-bar";
import RegionFilter from "../components/shared/region-filter";
import CountryCard from "../components/shared/country-card";
import LazyImage from "../components/shared/lazy-image";
import { useQuery } from "react-query";
import { useCountry } from "../components/provider/country-context";

const fetchCountries = async (search: string, region: string) => {
  let url = "https://restcountries.com/v3.1/all";

  if (search) {
    url = `https://restcountries.com/v3.1/name/${search}`;
  } else if (region) {
    url = `https://restcountries.com/v3.1/region/${region}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }
  return response.json();
};

const Landing: React.FC = () => {
  const { setLoading } = useCountry();
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search") || "";
  const region = new URLSearchParams(location.search).get("region") || "";

  const {
    data: countryData = [],
    isLoading,
    error,
  } = useQuery(
    ["countries", search, region],
    () => fetchCountries(search, region),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);
  return (
    <main className="min-h-screen  p-4">
      <div className="container mx-auto">
        <div className="flex gap-6 flex-col md:flex-row justify-between mb-8">
          <SearchBar />
          <RegionFilter />
        </div>
        {isLoading && (
          <div className="flex items-center justify-center">
            <p>Loading...</p>
          </div>
        )}

        {/* {error && (
          <div className="flex items-center justify-center">
            <p>Error loading countries</p>
          </div>
        )} */}
        {countryData.length === 0 && !isLoading && !error && (
          <div className="flex items-center border rounded-3xl py-12 justify-center mt-8">
            <LazyImage
              src="/images/not-found.gif"
              alt="Not found"
              className="rounded-3xl"
            />
          </div>
        )}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {countryData.map((country: any) => (
            <CountryCard
              key={country?.cioc}
              cioc={country?.ccn3}
              name={country?.name.common}
              flag={country.flags?.png}
              capital={country?.capital?.[0] || "N/A"}
              region={country.region}
              population={country.population ?? 0}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Landing;
