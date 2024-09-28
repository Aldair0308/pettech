import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  rol: string;
  photo: string;
}

export const useUserHook = () => {
  const [user, setUser] = useState<User | null>(null);

  // Función para obtener el ID del usuario almacenado en AsyncStorage
  const obtenerIdDelUsuario = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      return userId ? parseInt(userId) : null; // Parsea el ID a número o devuelve null si no hay ID
    } catch (error) {
      console.error("Error fetching user ID from AsyncStorage:", error);
      return null;
    }
  };

  const fetchUserData = async () => {
    try {
      const userId = await obtenerIdDelUsuario(); // Obtener el ID del usuario
      if (!userId) {
        throw new Error("User ID not found in AsyncStorage");
      }
      const response = await fetch(
        `https://pueblo-nest-production.up.railway.app/api/v1/users/${userId}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return { user, fetchUserData };
};
