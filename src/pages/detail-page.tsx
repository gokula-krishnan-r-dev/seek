import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CountryT } from "../components/type/country";
import LazyImage from "../components/shared/lazy-image";
import { useQuery } from "react-query";

const DetailsPage: React.FC = () => {
  const { cioc } = useParams<{ cioc: string }>();
  const [countryTime, setCountryTime] = useState<string>("");
  const {
    data: country,
    error,
    isLoading,
  } = useQuery(
    "country",
    async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${cioc}`
      );
      return response.json();
    },
    {
      enabled: !!cioc,
    }
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const timeZone =
        country?.[0]?.timezones?.find((tz: string) => {
          try {
            new Date().toLocaleTimeString("en-US", { timeZone: tz });
            return true;
          } catch (error) {
            return false;
          }
        }) || "UTC";
      const currentTime = new Date().toLocaleTimeString("en-US", {
        timeZone: timeZone,
      });
      setCountryTime(currentTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [country]);

  if (isLoading)
    return (
      <div className="min-h-screen px-6 lg:px-24 py-6 lg:py-12">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen">
        <p>Error...</p>
      </div>
    );

  const {
    name,
    capital,
    population,
    region,
    currencies,
    languages,
    flags,
    borders,
    subregion,
  }: CountryT = country[0];
  const languageEntries = Object.entries(languages || {});
  const currenciesEntries = Object.entries(currencies || {});
  return (
    <div className="px-4 md:px-24  lg:pb-0 pb-12 min-h-screen">
      <div className="pt-6 text-text dark:text-white pb-6">
        <Link to="/" className="flex items-center gap-2">
          <svg
            width="19"
            height="12"
            viewBox="0 0 19 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.46447 0.107445L7.64298 1.28596L3.75389 5.17504L18.6031 5.17504L18.6031 6.82496L3.75389 6.82496L7.64298 10.714L6.46447 11.8926L0.57191 6L6.46447 0.107445Z"
              fill="#111517"
            />
          </svg>
          Back
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-8 text-text dark:text-white">
        <div className="flex-1">
          <div className="mb-4">
            <LazyImage
              src={flags?.svg}
              alt={`Flag of ${name.common}`}
              className="w-full h-full border rounded-3xl object-cover"
            />
            {countryTime && (
              <div className="mt-4 lg:block hidden">
                <h2 className="text-xl font-bold">Timezones</h2>
                <div className="border rounded-3xl px-4 py-2 w-max">
                  <p className="text-3xl font-bold">{countryTime}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 mt-12">
          <h1 className="text-3xl font-bold mb-4">{name.common}</h1>
          <div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <p>
                  <strong>Native Name:</strong> {name.official}
                </p>
                <p>
                  <strong>Population:</strong> {population?.toLocaleString()}
                </p>
                <p>
                  <strong>Region:</strong> {region}
                </p>
                <p>
                  <strong>Sub Region:</strong> {subregion}
                </p>
                <p>
                  <strong>Capital:</strong> {capital}
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  <strong>Top Level Domain:</strong> {name.common}
                </p>
                <p>
                  <strong>Currencies:</strong>{" "}
                  {currenciesEntries?.map(([key, value]: any, index: any) => (
                    <span key={index}>
                      {value.name} | {value.symbol}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div>
                <h2 className="text-xl font-bold">Languages</h2>
                <ul className="list-disc pl-4">
                  {languageEntries?.map(([key, value]: any, index: any) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold">Currencies</h2>
                <ul className="list-disc pl-4">
                  {currenciesEntries?.map(([key, value]: any, index: any) => (
                    <li key={index}>
                      {value.name} | {value.symbol}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {borders && (
              <div className="">
                <h2 className="text-xl font-bold mt-6">Border Countries</h2>
                <div className="flex flex-wrap mt-2 gap-2">
                  {borders?.map((border: string, index: number) => (
                    <Link
                      target="_blank"
                      to={`/${border}`}
                      key={index}
                      className="bg-gray-100 px-4 py-2 rounded-full text-text dark:text-white dark:bg-darkBlue border hover:bg-gray-200 hover:text-gray-800"
                    >
                      {border}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {countryTime && (
            <div className="mt-4 lg:hidden block">
              <h2 className="text-xl font-bold">Timezones</h2>
              <div className="border rounded-3xl px-4 py-2 w-max">
                <p className="text-3xl font-bold">{countryTime}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
