import React, { createContext, useState, ReactNode } from "react";
import {
  lightTheme,
  darkTheme,
  blueTheme,
  greenTheme,
} from "./../themes/appTheme";

const themes = [lightTheme, darkTheme, blueTheme, greenTheme];

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
      nextTheme: () => void;
      prevTheme: () => void;
    }
  | undefined
>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const nextTheme = () => {
    setCurrentThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
  };

  const prevTheme = () => {
    setCurrentThemeIndex(
      (prevIndex) => (prevIndex - 1 + themes.length) % themes.length
    );
  };

  return (
    <ThemeContext.Provider
      value={{ theme: themes[currentThemeIndex], nextTheme, prevTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
