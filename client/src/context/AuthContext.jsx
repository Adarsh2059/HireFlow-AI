import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getProfile } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getProfile();

        setUser(response.data);
      } catch (error) {
        console.log(error.response?.data);
        logout();
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [token]);

  const login = (userData, jwtToken) => {
    localStorage.setItem("token", jwtToken);

    setUser(userData);
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);