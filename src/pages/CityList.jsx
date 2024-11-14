import City from "./City";
import style from "./CityList.module.css";

export default function CityList({ cities, isLoading }) {
  return (
    <ul className={style.cityList}>
      {cities.map((city, index) => (
        <li key={index}>
          <City />
        </li>
      ))}
    </ul>
  );
}
