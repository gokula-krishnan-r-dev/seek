import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const RegionFilter: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRegion = event.target.value;

    const searchParams = new URLSearchParams(location.search);
    if (selectedRegion) {
      searchParams.set("region", selectedRegion);
    } else {
      searchParams.delete("region");
    }

    navigate({ search: searchParams.toString() });
  };

  return (
    <select
      className="w-full p-4 rounded-3xl dark:border-0 border bg-white dark:bg-darkBlue  focus:outline-none"
      onChange={handleRegionChange}
    >
      <option value="">Filter by Region</option>
      {regions.map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  );
};

export default RegionFilter;
