import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  _id: string; // Cambiado a string para que coincida con el formato de MongoDB
  name: string;
  email: string;
  password: string; // Asegúrate de que este campo esté protegido y no se exponga innecesariamente
  rol: string;
  photo: string;
}

export const useUserHook = () => {
  const [user, setUser] = useState<User | null>(null);

  // Función para obtener el ID del usuario almacenado en AsyncStorage
  const obtenerIdDelUsuario = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      return userId; // No lo parses a número, déjalo como string
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
        `http://192.168.100.169:3000/users/id/${userId}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch user data: ${response.statusText} y tiene el id ${userId}`
        );
      }
      const userData = await response.json();
      setUser(userData);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return { user, fetchUserData };
};
