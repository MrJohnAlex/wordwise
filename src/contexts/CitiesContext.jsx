import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:4000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "LOADED_CITIES":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "LOADED_CITY":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "CREATED_CITY":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "DELETED_CITY":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "ERROR":
      return {
        cities: [],
        isLoading: false,
        currentCity: {},
        error: action.payload,
      };
    default:
      throw new Error("Invalid action type");
  }
}
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "LOADING" });
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const res = await response.json();
        dispatch({ type: "LOADED_CITIES", payload: res });
      } catch {
        dispatch({ type: "ERROR", payload: "Error fetching cities" });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "LOADING" });
    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const res = await response.json();
      dispatch({ type: "LOADED_CITY", payload: res });
    } catch {
      dispatch({ type: "ERROR", payload: "Error fetching city" });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "LOADING" });
    try {
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const res = await response.json();
      dispatch({ type: "CREATED_CITY", payload: res });
    } catch {
      dispatch({ type: "ERROR", payload: "Error creating city" });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "LOADING" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "DELETED_CITY", payload: id });
    } catch {
      dispatch({ type: "ERROR", payload: "Error deleting city" });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
