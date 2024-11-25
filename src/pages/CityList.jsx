import { useCities } from "../contexts/CitiesContext";
import CityItem from "./CityItem";
import style from "./CityList.module.css";
import Message from "./Message";

export default function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (cities.length === 0) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }
  return (
    <ul className={style.cityList}>
      {cities.map((city, index) => (
        <CityItem city={city} key={index} />
      ))}
    </ul>
  );
}
