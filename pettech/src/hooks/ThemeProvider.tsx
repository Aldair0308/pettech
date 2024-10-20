import React, { createContext, useState, ReactNode } from "react";
import { lightTheme, darkTheme } from "./../themes/appTheme";

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

  const toggleTheme = () => {
    setCurrentThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
  };

  return (
    <ThemeContext.Provider
      value={{ theme: themes[currentThemeIndex], toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
