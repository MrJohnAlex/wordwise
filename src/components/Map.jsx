// import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./Map.module.css";
import { useState } from "react";
import { useCities } from "../contexts/CitiesContext";
export default function Map() {
  const [initialPosition, setInitailPosition] = useState([51.505, -0.09]);
  const { cities } = useCities();

  // const navigate = useNavigate();
  // const [searchParam, setSearchParam] = useSearchParams();
  // const lat = searchParam.get("lat");
  // const lng = searchParam.get("lng");
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={initialPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
