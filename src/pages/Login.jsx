import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
export default function Login() {
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
          />
        </div>
      </form>
    </main>
  );
}
