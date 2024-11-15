import { Alert, Button, View, Text, Switch } from "react-native";
import styled from "styled-components";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import App from "../../App";
import { useTheme } from "../../theme/Theme"; // 경로에 맞게 수정
import { MainStackScreenList } from "../../stack/MainStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";

export default function MyPageScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  const { toggleTheme } = useTheme();
  const [isEnabled, setIsEnabled] = useState(useTheme().isDark);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    toggleTheme();
  };

  const Container = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.text};
  `;

  const VisitList = styled(View)`
    flex-direction: row; /* 가로 방향으로 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    margin-top: 20px; /* 상단 마진 추가 (선택 사항) */
  `;
  const Favorites = styled(View)`
    flex-direction: row; /* 가로 방향으로 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    margin-top: 20px; /* 상단 마진 추가 (선택 사항) */
  `;
  const Review = styled(View)`
    flex-direction: row; /* 가로 방향으로 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    margin-top: 20px; /* 상단 마진 추가 (선택 사항) */
  `;
  const MyPageBtn = styled(TouchableOpacity)``;
  const Setting = styled(View)`
    flex-direction: row; /* 가로 방향으로 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    margin-top: 20px; /* 상단 마진 추가 (선택 사항) */
  `;
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
  const MyPageText = styled(Text)`
    color: ${(props) => props.theme.text};
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

  const nav = useNavigation<NativeStackNavigationProp<MainStackScreenList>>();
  //위치 이동
  return (
    <Container>
      <Setting>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <MyPageText style={{ marginLeft: 10 }}>{isEnabled ? "다크 모드입니다." : "라이트 모드입니다."}</MyPageText>
      </Setting>
      <About>
        <Button
          title={hasLocationPermission ? "위치 권한이 허용됨" : "위치 권한 요청"}
          onPress={requestLocationPermission}
          disabled={hasLocationPermission}
        />
        <MyPageText style={{ marginLeft: 10 }}>
          {hasLocationPermission ? "권한이 허용되었습니다." : "권한이 필요합니다."}
        </MyPageText>
      </About>
      <Alarm>
        <Button
          title={hasPermission ? "알림 권한이 허용됨" : "알림 권한 요청"}
          onPress={requestPermission}
          disabled={hasPermission}
        />
        <MyPageText style={{ marginLeft: 10 }}>
          {hasPermission ? "권한이 허용되었습니다." : "권한이 필요합니다."}
        </MyPageText>
      </Alarm>
    </Container>
  );
}
