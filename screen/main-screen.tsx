import React, { useEffect, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text, SafeAreaView, TextInput, Alert, StyleSheet } from "react-native";
import styled from "styled-components/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  EmergencyRoomScreen: undefined;
  FirstAidScreen: undefined;
  BookmarkScreen: undefined;
  EmergencyConditionSearchScreen: undefined;
  TestScreen: undefined;
  MyPage: undefined;
  EmergencyRoomList: undefined;
};

const MainScreen = () => {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showButtons, setShowButtons] = useState<boolean>(true);
  const [address, setAddress] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const [mapRegion, setMapRegion] = useState({
    latitude: 37.5665,
    longitude: 126.978,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // 최근 검색어를 AsyncStorage에 저장
  const saveRecentSearches = async (searchTerm: string) => {
    try {
      const updatedSearches = [searchTerm, ...recentSearches]
        .filter((value, index, self) => self.indexOf(value) === index) // 중복 제거
        .slice(0, 5); // 최신 검색어 5개만 저장
      await AsyncStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      setRecentSearches(updatedSearches);
    } catch (error) {
      console.error("최근 검색어 저장 실패:", error);
    }
  };

  // 최근 검색어를 AsyncStorage에서 불러오기
  const loadRecentSearches = async () => {
    try {
      const savedSearches = await AsyncStorage.getItem("recentSearches");
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }
    } catch (error) {
      console.error("최근 검색어 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await locationPermissions();
      await loadRecentSearches(); // 검색어 불러오기
    };
    initialize();
  }, []);

  // 위치 권한 요청 및 초기 위치 설정
  const locationPermissions = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("위치에 대한 액세스 권한이 거부되었습니다.");
        return;
      }
      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
      setMapRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      fetchAddressFromCoords(userLocation.coords.latitude, userLocation.coords.longitude);
    } catch (error) {
      setErrorMsg("Failed to get current location.");
    }
  };

  // 위도, 경도로부터 주소 정보 가져오기
  const fetchAddressFromCoords = async (latitude: number, longitude: number) => {
    try {
      const [result] = await Location.reverseGeocodeAsync({ latitude, longitude });
      const fullAddress = [
        result.region || "", result.city || "", result.district || "", result.street || "", result.name || ""
      ].filter(Boolean).join(" ");
      setAddress(fullAddress);
    } catch (error) {
      setErrorMsg("역 지오코딩 중 오류가 발생했습니다.");
    }
  };

  // 검색 함수 (메모이제이션 처리)
  const handleSearch = useCallback(async () => {
    try {
      const results = await Location.geocodeAsync(searchQuery);
      if (results.length > 0) {
        const { latitude, longitude } = results[0];
        setMapRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        fetchAddressFromCoords(latitude, longitude);
        setSearchQuery("");
        saveRecentSearches(searchQuery);
      } else {
        Alert.alert("위치를 찾을 수 없습니다.");
      }
    } catch (error) {
      setErrorMsg("위치 검색 중 오류가 발생했습니다.");
    }
  }, [searchQuery]);

  // 줌 인/아웃 핸들러
  const handleZoom = (factor: number) => {
    setMapRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * factor,
      longitudeDelta: prevRegion.longitudeDelta * factor,
    }));
  };

  return (
    <SafeContainer>
      <Header>
        <MenuButton onPress={() => setShowButtons(!showButtons)}>
          <FontAwesome name="bars" size={24} color="black" />
        </MenuButton>
        <HeaderText>의료 앱</HeaderText>
      </Header>

      <Container>
        <MapV region={mapRegion} showsUserLocation={true}>
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="현재 위치"
            />
          )}
        </MapV>

        <SearchAddressContainer>
          <SearchInput
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <AddressContainer>
            <AddressText>{address ? `주소: ${address}` : "위치를 선택하세요"}</AddressText>
            {errorMsg && <ErrorText>{errorMsg}</ErrorText>}
          </AddressContainer>
        </SearchAddressContainer>

        <ZoomButtonContainer>
          <ZoomButton onPress={() => handleZoom(0.5)}>
            <FontAwesome name="plus" size={24} color="black" />
          </ZoomButton>
          <ZoomButton onPress={() => handleZoom(2)}>
            <FontAwesome name="minus" size={24} color="black" />
          </ZoomButton>
        </ZoomButtonContainer>
      </Container>

      <RecentSearchesContainer>
        <Text>최근 검색어</Text>
        {recentSearches.length > 0 ? (
          recentSearches.map((search, index) => (
            <RecentSearchText key={index}>{search}</RecentSearchText>
          ))
        ) : (
          <Text>최근 검색어가 없습니다.</Text>
        )}
      </RecentSearchesContainer>

      <ButtonContainer show={showButtons}>
        {[
          { title: "응급실", screen: "EmergencyRoomScreen" },
          { title: "응급처치", screen: "FirstAidScreen" },
          { title: "즐겨찾기", screen: "BookmarkScreen" },
          { title: "응급실조건검색", screen: "EmergencyConditionSearchScreen" },
          { title: "상세페이지(테스트용)", screen: "TestScreen" },
          { title: "테스트용", screen: "MyPage" },
          { title: "EmergencyRoomList", screen: "EmergencyRoomList" },
        ].map((button) => (
          <ActionButton key={button.screen} onPress={() => navigation.navigate(button.screen)}>
            <ActionButtonText>{button.title}</ActionButtonText>
          </ActionButton>
        ))}
      </ButtonContainer>

      <ToggleButton onPress={() => setShowButtons(!showButtons)}>
        <FontAwesome name={showButtons ? "chevron-down" : "chevron-up"} size={24} color="black" />
      </ToggleButton>
    </SafeContainer>
  );
};

// Styled components
const SafeContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #f5f5f5;
  justify-content: space-between`
;

const Header = styled(View)`
  width: 100%;
  padding: 20px;
  background-color: #ff8520;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;`
;

const HeaderText = styled(Text)`
  color: black;
  font-size: 24px;
  font-weight: bold;
  flex: 1;
  text-align: center;`
;

const MenuButton = styled(TouchableOpacity)`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;`
;

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;`
;

const MapV = styled(MapView)`
  width: 100%;
  height: 100%;`
;

const SearchAddressContainer = styled(View)`
  align-items: center;
  width: 100%;
  height: 130px;
  position: absolute;
  top: 10;`
;

const SearchContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 90%;
  position: absolute;
  top: 30px;`
;

const SearchInput = styled(TextInput)`
  width: 95%;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: white;
`;

const SearchButton = styled(TouchableOpacity)`
  background-color: #ff8520;
  padding: 10px;
  border-radius: 5px;
  height: 45px;
  left: 15;`
;

const SearchButtonText = styled(Text)`
  color: white;
  text-align: center;
`;

const ZoomButtonContainer = styled(View)`
  position: absolute;
  right: 10px;
  top: 190px;
  flex-direction: column;
  align-items: center;
`;

const ZoomButton = styled(TouchableOpacity)`
  width: 50px;
  height: 50px;
  background-color: #ff8520;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const AddressContainer = styled(View)`
  position: absolute;
  left: 20px;
  right: 20px;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
`;

const AddressText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
`;

const ErrorText = styled(Text)`
  color: red;
`;

const ButtonContainer = styled(View)<{ show: boolean }>`
  padding: 10px;
  background-color: #f5f5f5;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  display: ${(props) => (props.show ? "flex" : "none")};
`;

const ActionButton = styled(TouchableOpacity)`
  width: 22%;
  height: 80px;
  margin-bottom: 10px;
  background-color: #ff8520;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const ActionButtonText = styled(Text)`
  font-size: 14px;
  color: black;
  font-weight: bold;
`;

const ToggleButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #ff8520;
  padding: 10px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FFF',
  },
  text: {
      fontSize: 16,
      color: '#000',
  },
});


const RecentSearchesContainer = styled(View)`
  width: 90%;
  background-color: #fff;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px
`;

const RecentSearchText = styled(Text)`
  font-size: 14px;
  color: #333;
  margin-bottom: 5px`
;

export default MainScreen;

