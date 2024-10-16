import { createStackNavigator } from "@react-navigation/stack";
import mainScreen from "../screen/MainScreen";
import googleScreen from "../screen/GoogleMapScreen";
import testscreen from "../screen/Test";
import placeDetailScreen from "../screen/PlaceDetailScreen";

//이동할 스크린 stacknavigator type 지정
export type MainStackScreenList = {
  main: undefined;
  google: undefined;
  test: undefined;
  PlaceDetail: any;
};

//stactnavigator 생성
const Stack = createStackNavigator<MainStackScreenList>();

export default () => {
  //stack안에 이동할 페이지 만들어 그룹화
  return (
    <Stack.Navigator>
      <Stack.Screen name="main" component={mainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="google" component={googleScreen} />
      <Stack.Screen name="test" component={testscreen} />
      <Stack.Screen name="PlaceDetail" component={placeDetailScreen} />
    </Stack.Navigator>
  );
};
