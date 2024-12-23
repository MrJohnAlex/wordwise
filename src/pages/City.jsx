import { useParams, useSearchParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";

export default function City() {
  const { id } = useParams();

  const { getCity, currentCity, isLoading } = useCities();

  const { cityName, emoji, data, notes } = currentCity;

  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );
  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <div>
        <h1>
          {cityName} {emoji}
        </h1>
        <p>{data}</p>
        <p>{notes}</p>
      </div>
    </div>
  );
}
