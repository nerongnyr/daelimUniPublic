import React, { createContext, useContext, useState } from "react";

// 기본값을 설정합니다.
const defaultThemeContext = {
  isDark: false,
  toggleTheme: () => {},
};

const ThemeContext = createContext(defaultThemeContext); // 기본값 전달

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    console.log(isDark);
  };

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
};
