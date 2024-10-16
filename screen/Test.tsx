import { useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components";

const Container = styled(View)`
  flex: 1;
`;

const MapV = styled(MapView)`
  width: 100%;
  height: 100%;
`;

interface Place {
  id: number;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const generateRandomCoordinates = () => {
  const latitude = 37.78825 + (Math.random() - 0.5) * 0.1; // 랜덤한 위도 생성
  const longitude = -122.4324 + (Math.random() - 0.5) * 0.1; // 랜덤한 경도 생성
  return { latitude, longitude };
};

export default function RandomMarkersMap() {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    // 랜덤한 마커를 10개 생성
    const randomPlaces = Array.from({ length: 10 }).map((_, index) => {
      const { latitude, longitude } = generateRandomCoordinates();
      return {
        id: index,
        name: `랜덤 마커 ${index + 1}`,
        coordinates: { latitude, longitude },
      };
    });
    setPlaces(randomPlaces);
  }, []);

  return (
    <Container>
      <MapV
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {places.map((place) => (
          <Marker key={place.id} coordinate={place.coordinates} title={place.name} />
        ))}
      </MapV>
    </Container>
  );
}
