import axios from "axios";
import { useContext, createContext, type ReactNode } from "react";
import { useState, useEffect } from "react";

const AuthContext: any = createContext("");

export const useAuth: any = () => useContext(AuthContext);

type User = {
  _id: string;
  googleId: string;
  name: string;
  role: string;
  email: string;
  picture: string;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<Boolean>(true);
  const url = "/api/users/me";
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(url);
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.log("Error occurred ");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>{!loading && children}</AuthContext.Provider>
  );
};

export default AuthProvider;
