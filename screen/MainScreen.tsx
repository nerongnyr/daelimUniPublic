import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackScreenList } from "../stack/MainStack";

export default function MainScreen() {
  const nav = useNavigation<NativeStackNavigationProp<MainStackScreenList>>();

  const Container = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
  `;
  const MapV = styled(MapView)`
    width: 100%;
    height: 100%;
  `;
  const BtnGoogle = styled(TouchableOpacity)`
    align-items: center;
    height: 30px;
    background-color: gray;
  `;

  const BtnTxt = styled(Text)``;

  const testPage = () => nav.navigate("google");
  const tesPage = () => nav.navigate("test");
  const tePage = () => nav.navigate("MyPage");

  return (
    <Container>
      <BtnGoogle onPress={() => testPage()}>
        <BtnTxt> 구글 맵 확인용 </BtnTxt>
      </BtnGoogle>
      <BtnGoogle onPress={() => tePage()}>
        <BtnTxt> 마크 확인용 </BtnTxt>
      </BtnGoogle>
    </Container>
  );
}
