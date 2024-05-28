import React from "react";
import LazyImage from "./lazy-image";
import { Link } from "react-router-dom";

interface CountryCardProps {
  name?: string;
  flag?: string;
  capital?: string;
  region?: string;
  population: number;
  cioc?: string;
}

const CountryCard: React.FC<CountryCardProps> = ({
  name,
  flag,
  capital,
  region,
  population,
  cioc,
}) => {
  return (
    <Link
      to={`/${cioc}`}
      className="max-w-sm rounded-3xl overflow-hidden dark:border-0 border hover:shadow-xl duration-500 bg-white dark:bg-darkBlue"
    >
      <LazyImage
        src={flag}
        alt={`Flag of ${name}`}
        className="w-full h-48 object-cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-text dark:text-white text-xl mb-2">
          {name}
        </div>
        <p className="text-text dark:text-white text-base">
          <strong>Population:</strong> {population.toLocaleString()}
        </p>
        <p className="text-text dark:text-gray-200 text-base">
          <strong>Region:</strong> {region}
        </p>
        <p className="text-text dark:text-gray-200 text-base">
          <strong>Capital:</strong> {capital}
        </p>
      </div>
    </Link>
  );
};

export default CountryCard;
