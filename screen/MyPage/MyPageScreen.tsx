import { Alert, Button, View, Text } from "react-native";
import styled from "styled-components";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function MyPageScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  const Container = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
  `;

  const VisitList = styled(View)``;
  const Favorites = styled(View)``;
  const Review = styled(View)``;
  const Setting = styled(View)``;
  const About = styled(View)`
    flex-direction: row; /* 가로 방향으로 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    margin-top: 20px; /* 상단 마진 추가 (선택 사항) */
  `;
  const Alarm = styled(View)`
    flex-direction: row; /* 가로 방향으로 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    margin-top: 20px; /* 상단 마진 추가 (선택 사항) */
  `;

  useEffect(() => {
    checkPermission();
    checkLocationPermission();
  }, []);

  //권한 설정
  const checkPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setHasPermission(status === "granted");
  };
  const checkLocationPermission = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    setHasLocationPermission(status === "granted");
  };

  const requestPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === "granted") {
      setHasPermission(true);
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("푸시 알림 토큰:", token);
    } else {
      Alert.alert("알림 권한이 필요합니다. 설정에서 권한을 허용해 주세요.");
    }
  };

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      setHasLocationPermission(true);
      Alert.alert("위치 권한이 허용되었습니다.");
    } else {
      Alert.alert("위치 권한이 필요합니다.");
    }
  };

  return (
    <Container>
      <VisitList></VisitList>
      <Favorites></Favorites>
      <Review></Review>
      <Setting></Setting>
      <About>
        <Button
          title={hasLocationPermission ? "위치 권한이 허용됨" : "위치 권한 요청"}
          onPress={requestLocationPermission}
          disabled={hasLocationPermission}
        />
        <Text style={{ marginLeft: 10 }}>
          {hasLocationPermission ? "권한이 허용되었습니다." : "권한이 필요합니다."}
        </Text>
      </About>
      <Alarm>
        <Button
          title={hasPermission ? "알림 권한이 허용됨" : "알림 권한 요청"}
          onPress={requestPermission}
          disabled={hasPermission}
        />
        <Text style={{ marginLeft: 10 }}>{hasPermission ? "권한이 허용되었습니다." : "권한이 필요합니다."}</Text>
      </Alarm>
    </Container>
  );
}
