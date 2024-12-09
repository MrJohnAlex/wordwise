import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
export default function Map() {
  const [initialPosition, setInitialPosition] = useState([51.505, -0.09]);
  const { cities } = useCities();

  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const mapLat = searchParam.get("lat");
  const mapLng = searchParam.get("lng");
  useEffect(
    function () {
      if (mapLat && mapLng) {
        setInitialPosition([Number(mapLat), Number(mapLng)]);
      }
    },
    [mapLat, mapLng]
  );
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={initialPosition}
        zoom={6}
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
      <ChangeMapCenter position={initialPosition} />
    </div>
  );
}

function ChangeMapCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
