import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainStack from "./stack/MainStack";
import { ThemeProvider, useTheme } from "./theme/Theme"; // 경로에 맞게 수정
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import { useContext } from "react";

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const AppContent = () => {
  const { isDark } = useTheme(); // 테마 상태 가져오기

  const lightTheme = {
    background: "#ffffff",
    text: "#000000",
  };

  const darkTheme = {
    background: "#000000",
    text: "#ffffff",
  };

  return (
    <StyledThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <MainStack />
      </NavigationContainer>
    </StyledThemeProvider>
  );
};
