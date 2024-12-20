import Map from "../components/Map";
import SideBar from "../components/SideBar";
import styles from "./AppLayout.module.css";
import User from "./User";
export default function AppLayout() {
  return (
    <div className={styles.layout}>
      <SideBar />
      <Map />
      <User />
    </div>
  );
}
