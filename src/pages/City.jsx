import { useParams, useSearchParams } from "react-router-dom";

export default function City() {
  const x = useParams();
  const [searchParam, setSearchParam] = useSearchParams();
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");
  // const cities = [
  //   { name: "New York", population: 8.62e6 },
  //   { name: "London", population: 8.982e6 },
  //   { name: "Tokyo", population: 37.92e6 },
  // ];

  return (
    <div>
      City
      <h4>position: {(lat, lng)}</h4>
    </div>
  );
}
