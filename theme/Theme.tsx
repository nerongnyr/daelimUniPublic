import React, { createContext, useContext, useEffect, useState } from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 기본값을 설정합니다.
const defaultThemeContext = {
  isDark: false,
  toggleTheme: () => {},
};

const ThemeContext = createContext(defaultThemeContext); // 기본값 전달

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("isDark");
        if (storedTheme !== null) {
          setIsDark(JSON.parse(storedTheme)); // 문자열을 불리언으로 변환
        }
      } catch (e) {
        console.error("Failed to load theme", e);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    try {
      await AsyncStorage.setItem("isDark", JSON.stringify(newTheme)); // 새로운 테마를 저장
    } catch (e) {
      console.error("Failed to save theme", e);
    }
  };

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
};
