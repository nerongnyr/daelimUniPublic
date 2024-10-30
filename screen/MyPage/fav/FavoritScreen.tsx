import { View } from "react-native";
import styled from "styled-components";

export default function FavoritScreen() {
  const Container = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.text};
  `;
  return <Container></Container>;
}
