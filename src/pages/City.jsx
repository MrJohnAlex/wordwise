import CityList from "./CityList";

export default function City() {
  const cities = [
    { name: "New York", population: 8.62e6 },
    { name: "London", population: 8.982e6 },
    { name: "Tokyo", population: 37.92e6 },
  ];

  return (
    <div>
      <CityList cities={cities} />
    </div>
  );
}
