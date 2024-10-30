import { createStackNavigator } from "@react-navigation/stack";
import mainScreen from "../screen/MainScreen";
import googleScreen from "../screen/GoogleMapScreen";
import testscreen from "../screen/Test";
import placeDetailScreen from "../screen/PlaceDetailScreen";
import myPage from "../screen/MyPage/MyPageScreen";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import VisitListScreen from "../screen/MyPage/VisitList/VisitListScreen";
import FavoritScreen from "../screen/MyPage/fav/FavoritScreen";

//이동할 스크린 stacknavigator type 지정
export type MainStackScreenList = {
  main: undefined;
  google: undefined;
  test: undefined;
  PlaceDetail: any;
  MyPage: any;
  Favorit: undefined;
  Visit: undefined;
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
    <Stack.Navigator>
      <Stack.Screen name="main" component={mainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="google" component={googleScreen} />
      <Stack.Screen name="test" component={testscreen} />
      <Stack.Screen name="PlaceDetail" component={placeDetailScreen} />
      <Stack.Screen
        name="MyPage"
        component={myPage}
        options={{
          title: "마이 페이지",
        }}
      />
      <Stack.Screen name="Visit" component={VisitListScreen} />
      <Stack.Screen name="Favorit" component={FavoritScreen} />
    </Stack.Navigator>
  );
};
