import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    default:
      throw new Error("Invalid action");
  }
}

const FAKEUSER = {
  name: "Alex",
  email: "example@example.com",
  password: "password",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    if (email === FAKEUSER.email && password === FAKEUSER.password) {
      dispatch({ type: "LOGIN", payload: FAKEUSER });
    } else {
      alert("Invalid email or password");
    }
  }
  function logout() {
    dispatch({ type: "LOGOUT" });
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("context was must be used outside an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
