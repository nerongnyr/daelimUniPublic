import { createStackNavigator } from "@react-navigation/stack";
import googleScreen from "../screen/GoogleMapScreen";
import testscreen from "../screen/Test";
import placeDetailScreen from "../screen/PlaceDetailScreen";
import myPage from "../screen/MyPage/MyPageScreen";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import MainScreen from "../screen/main-screen";
import TestScreen from "../screen/test/test-screen";
import EmergencyRoomScreen from "../screen/emergency-room/emergency-room-screen";
import FirstAidScreen from "../screen/first-aid/first-aid-screen";
import BookmarkScreen from "../screen/bookmark/bookmark-screen";
import EmergencyConditionSearchScreen from "../screen/emergency-condition-search/emergency-condition-search-screen";
import EmergencyRoomList from "../screen/emergencyList/EmergencyList";

//이동할 스크린 stacknavigator type 지정
export type MainStackScreenList = {
  Main: undefined;
  google: undefined;
  test: undefined;
  PlaceDetail: any;
  MyPage: any;
  Favorit: undefined;
  Visit: undefined;
  TestScreen: undefined;
  EmergencyRoomScreen: undefined;
  FirstAidScreen: undefined;
  BookmarkScreen: undefined;
  EmergencyConditionSearchScreen: undefined;
  EmergencyRoomList: undefined;
};

//stactnavigator 생성
const Stack = createStackNavigator<MainStackScreenList>();

export default () => {
  //stack안에 이동할 페이지 만들어 그룹화

  const nav = useNavigation<NativeStackNavigationProp<MainStackScreenList>>();

  const HeaderBtn = styled(TouchableOpacity)`
    align-items: center;
    height: 30px;
    background-color: gray;
  `;
  const HeaderTxt = styled(Text)`
    font-size: 18px;
  `;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="google" component={googleScreen} />
      <Stack.Screen name="test" component={testscreen} />
      <Stack.Screen name="PlaceDetail" component={placeDetailScreen} />
      <Stack.Screen
        name="MyPage"
        component={myPage}
        options={{
          headerShown: true,
          title: "마이 페이지",
        }}
      />
      <Stack.Screen name="TestScreen" component={TestScreen} />
      <Stack.Screen name="EmergencyRoomScreen" component={EmergencyRoomScreen} />
      <Stack.Screen name="FirstAidScreen" component={FirstAidScreen} />
      <Stack.Screen name="BookmarkScreen" component={BookmarkScreen} />
      <Stack.Screen name="EmergencyConditionSearchScreen" component={EmergencyConditionSearchScreen} />
      <Stack.Screen
        name="EmergencyRoomList"
        component={EmergencyRoomList}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};
