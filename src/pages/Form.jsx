import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form..module.css";
import Button from "../pages/Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import { map } from "leaflet";

export function convertToEmoji(contryCode) {
  const codePoints = contryCode
    .toUpperCase()
    .split("")
    .map((char) => 12739 + char.charCodeAr());
  return String.fromCodePoint(...codePoints);
}
export default function Form() {
  const [mapLat, mapLng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();
  const [isLoadingGeoCodeing, setIsLoadingGeoCodeing] = useState(false);
  const [cityName, setCityName] = useState();
  const [countryName, setCountryName] = useState();
  const [date, setDate] = useState(new Date());
  const [emoji, setEmoji] = useState("");
  const [notes, setNotes] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client/";

  useEffect(
    function () {
      if (!mapLat || !mapLng) return;
      async function fetchCityDate() {
        try {
          setIsLoadingGeoCodeing(true);
          setGeoCodingError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
          );
          const data = await res.json();
          console.log(data);

          setCityName(data.cityName || data.locality || "");
          setCountryName(data.countryName || data.countryName);
          // setEmoji(convertToEmoji(data.countryCode));
          if (!data.countryCode) {
            console.log("Hello world");

            throw new Error(
              "That doesn't seem to be a valid country code. Click somewhere else 😉"
            );
          }
        } catch (err) {
          setGeoCodingError(err.message);
        } finally {
          setIsLoadingGeoCodeing(false);
        }
      }
      fetchCityDate();
    },
    [mapLat, mapLng]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) {
      return;
    }
    const newCity = {
      cityName,
      countryName,
      notes,
      emoji,
      date: date.toISOString(),
      position: { lat: mapLat, lng: mapLng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  if (!mapLat && !mapLng)
    return <Message message="Start by clicking on the map" />;
  if (isLoadingGeoCodeing) return <Spinner />;
  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.formControl}>
        <label htmlFor="cityName">City Name</label>
        <input
          type="text"
          id="cityName"
          className={styles.input}
          placeholder="City Name"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <span className={styles.emoji}>{emoji}</span>
      </div>
      <div className={styles.formControl}>
        <label htmlFor="dateTime">
          When did you go {cityName ?? "Yangon"}?
        </label>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </div>
      <div className={styles.formControl}>
        <label htmlFor="cityName">Notes about your trip to {cityName}</label>
        <textarea
          type="text"
          className={styles.input}
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div className={styles.btn}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1); // Go back to previous page
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}
