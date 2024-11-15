// useBottomSheet.tsx
import { useRef } from "react";
import { Animated, PanResponder, Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
export const MIN_Y = 60; // Bottom Sheet가 올라올 수 있는 최저 위치
export const MAX_Y = windowHeight - 160; // Bottom Sheet가 내려갈 수 있는 최대 위치

export default function useBottomSheet() {
  // Bottom Sheet의 위치를 관리하는 Animated.Value
  const translateY = useRef(new Animated.Value(MAX_Y)).current;

  // 드래그 동작을 감지하는 PanResponder 설정
  const panResponder = useRef(
    PanResponder.create({
      // 드래그 동작을 시작할 때 호출
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10;
      },
      // 드래그 중에 호출 (Y 좌표 이동)
      onPanResponderMove: (_, gestureState) => {
        // 현재 translateY 값을 기반으로 새로운 Y 값을 계산
        const newY = Math.min(MAX_Y, Math.max(MIN_Y, gestureState.dy + MAX_Y));
        translateY.setValue(newY);
      },
      // 드래그를 끝냈을 때 호출
      onPanResponderRelease: (_, gestureState) => {
        // 패널을 위로 끌어올렸다면 최소 위치로 스프링 애니메이션
        if (gestureState.dy < -100) {
          Animated.spring(translateY, {
            toValue: MIN_Y,
            useNativeDriver: false,
          }).start();
        } else {
          // 아래로 드래그 했거나 이동이 적으면 최대 위치로 스프링 애니메이션
          Animated.spring(translateY, {
            toValue: MAX_Y,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  // translateY와 panResponder 반환
  return { translateY, panResponder };
}
