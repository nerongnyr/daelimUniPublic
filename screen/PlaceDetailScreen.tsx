import React from "react";
import { View, Text } from "react-native";

const PlaceDetailScreen = ({ route }: any) => {
  const { place } = route.params; // 전달된 place 데이터 받기

  return (
    <View>
      <Text>{place.name}</Text>
      <Text>주소: {place.vicinity}</Text>
      <Text>Rating: {place.rating || "N/A"}</Text>
    </View>
  );
};

export default PlaceDetailScreen;
