import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "../pages/Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
export default function Map() {
  const [initialPosition, setInitialPosition] = useState([51.505, -0.09]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geoLocation,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();
  useEffect(
    function () {
      if (mapLat && mapLng) {
        setInitialPosition([Number(mapLat), Number(mapLng)]);
      }
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geoLocation) {
        setInitialPosition([geoLocation.lat, geoLocation.lng]);
      }
    },
    [geoLocation]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoLocation && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Getting your location..." : "Get my location"}
        </Button>
      )}
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
        <ChangeMapCenter position={initialPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeMapCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
