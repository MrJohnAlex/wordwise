import CountryItem from "./CountryItem";
import style from "./CountryList.module.css";
import Message from "./Message";

export default function CountryList({ cities, isLoading }) {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (cities.length === 0) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }
  return (
    <ul className={style.countryList}>
      {cities.map((city, index) => (
        <CountryItem city={city} key={index} />
      ))}
    </ul>
  );
}
