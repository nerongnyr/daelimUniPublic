import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainStack from "./stack/MainStack";

export default function App() {
  const MainsStack = <MainStack />;
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
