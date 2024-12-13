import styles from "./Form..module.css";
import Button from "../pages/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState();
  const [countryName, setCountryName] = useState();
  return (
    <div className={styles.form}>
      <div className={styles.formControl}>
        <label htmlFor="cityName">City Name</label>
        <input
          type="text"
          id="cityName"
          className={styles.input}
          placeholder="City Name"
        />
      </div>
      <div className={styles.formControl}>
        <label htmlFor="dateTime">
          When did you go {cityName ?? "Yangon"}?
        </label>
        <input
          type="text"
          id="dateTime"
          className={styles.input}
          placeholder="Go Date"
        />
      </div>
      <div className={styles.formControl}>
        <label htmlFor="cityName">City Name</label>
        <textarea
          type="text"
          className={styles.input}
          placeholder="City Name"
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
    </div>
  );
}
