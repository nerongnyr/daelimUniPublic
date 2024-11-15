import { useEffect, useState } from "react";
import { Button, Modal, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackScreenList } from "../stack/MainStack";
import Constants from "expo-constants";
import React from "react";

const apiUrl = Constants?.expoConfig?.extra?.API_URL;
const apiKey = Constants?.expoConfig?.extra?.API_KEY;

type MarkerProps = {
  latitude: number;
  longitude: number;
  title: string;
  description?: string;
};

export default function GoogleMapScreen() {
  const Container = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
  `;
  const MapV = styled(MapView)`
    width: 100%;
    height: 100%;
  `;

  const MarkText = styled(Text)`
    font-weight: bold;
    font-size: 18px;
  `;

  const Mark = styled(Marker)``;

  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 마커 클릭 시 보여줄 장소 정보 상태 관리
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const nav = useNavigation<NativeStackNavigationProp<MainStackScreenList>>();

  // 마커 클릭 시 모달을 열고 선택된 장소 정보를 설정
  const handleMarkerPress = (place: any) => {
    nav.navigate("PlaceDetail", { place }); // 새로운 화면으로 이동
  };

  // 위치 권한 요청 및 현재 위치 가져오기
  const locationPermissions = async () => {
    var { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let userLocation = await Location.getCurrentPositionAsync({});
    setLocation(userLocation.coords);
  };

  // Google Places API로 주변 장소 가져오기
  const fetchNearbyPlaces = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch("");
      const data = await response.json();
      setPlaces(data.results);
    } catch (error) {
      console.error("Error fetching nearby places: ", error);
    }
  };

  useEffect(() => {
    locationPermissions();
  }, []);

  useEffect(() => {
    if (location) {
      fetchNearbyPlaces(location.latitude, location.longitude);
    }
  }, [location]);

  return (
    <Container>
      <MapV
        initialRegion={{
          latitude: location ? location.latitude : 37.78825,
          longitude: location ? location.longitude : -122.4324,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
      >
        {location && (
          <Mark
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="현재 위치"
          />
        )}

        {/* 주변 장소를 지도에 마커로 표시 */}
        {places.map((place, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: place.geometry.location.lat, // API에서 받아온 위도
              longitude: place.geometry.location.lng, // API에서 받아온 경도
            }}
            title={place.name}
            description={place.vicinity}
            onPress={() => handleMarkerPress(place)} // 마커 클릭 시 동작
          />
        ))}
      </MapV>
    </Container>
  );
}
