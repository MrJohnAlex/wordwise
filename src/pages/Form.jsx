import styles from "./Form..module.css";
import Button from "../pages/Button";
import { useNavigate } from "react-router-dom";
export default function Form() {
  const navigate = useNavigate();
  return (
    <div className={styles.form}>
      Form Component
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
