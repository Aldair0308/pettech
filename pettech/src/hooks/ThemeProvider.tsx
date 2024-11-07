import React, { createContext, useState, useEffect, ReactNode } from "react";
import { lightTheme, darkTheme } from "../themes/appTheme"; // Importar temas
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importar AsyncStorage

// Array de temas disponibles
const themes = [lightTheme, darkTheme];

interface Theme {
  container: object;
  switchContainer: object;
  text: object;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<
  | {
      theme: Theme;
      toggleTheme: () => void;
    }
  | undefined
>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  // Cargar el tema desde AsyncStorage al iniciar la aplicación
  useEffect(() => {
    const loadTheme = async () => {
      const storedThemeIndex = await AsyncStorage.getItem("themeIndex");
      if (storedThemeIndex) {
        setCurrentThemeIndex(Number(storedThemeIndex));
      }
    };

    loadTheme();
  }, []);

  // Cambiar el tema y guardar el cambio en AsyncStorage
  const toggleTheme = async () => {
    const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
    setCurrentThemeIndex(nextThemeIndex);

    // Guardar el nuevo tema en AsyncStorage
    await AsyncStorage.setItem("themeIndex", nextThemeIndex.toString());
  };

  return (
    <ThemeContext.Provider
      value={{ theme: themes[currentThemeIndex], toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
