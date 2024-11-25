import { useCities } from "../contexts/CitiesContext";
import CountryItem from "./CountryItem";
import style from "./CountryList.module.css";
import Message from "./Message";

export default function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (cities.length === 0) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }
  const countries = cities.reduce((acc, city) => {
    if (!acc.map((el) => el.country).includes(city.country)) {
      return [...acc, { country: city.country, emoji: city.emoji }];
    } else {
      return acc;
    }
  }, []);
  return (
    <ul className={style.countryList}>
      {countries.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  );
}
