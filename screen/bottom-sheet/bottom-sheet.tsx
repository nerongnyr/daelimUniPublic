import React, { useState, useEffect } from "react";
import { View, Text, Animated, StyleSheet, Button, TouchableOpacity } from "react-native";
import useBottomSheet from "./useBottomSheet";
import { MIN_Y } from "./useBottomSheet";
import axios from "axios";
import FilterButton from "./FilterButton";

// 필터 항목의 타입을 정의합니다.
interface Filter {
  iconName: string;
  id: number;
  name: string;
}

interface BottomSheetProps {
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>; // 부모 컴포넌트에서 전달된 prop
}

const exampleFilters = [
  { id: 1, name: "내과", iconName: "medical-services" },
  { id: 2, name: "피부과", iconName: "face" },
  { id: 3, name: "외과", iconName: "health-and-safety" },
  // 나머지 필터들...
];

const BottomSheet: React.FC<BottomSheetProps> = ({ setSelectedFilters }) => {
  const { translateY, panResponder } = useBottomSheet();
  const [filters, setFilters] = useState<Filter[]>(exampleFilters);
  const [selectedFilters, setSelectedLocalFilters] = useState<string[]>([]);

  const handleFilter = (filter: string) => {
    setSelectedLocalFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((item) => item !== filter)
        : [...prevFilters, filter]
    );
  };

  useEffect(() => {
    setSelectedFilters(selectedFilters);
  }, [selectedFilters, setSelectedFilters]);

  return (
    <Animated.View
      style={[styles.bottomSheet, { transform: [{ translateY }] }]}
      {...panResponder.panHandlers}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>목록 보기</Text>
      </View>

      <View style={styles.content}>
        <Text>필터를 선택하세요</Text>

        {/* 필터 버튼 렌더링 */}
          <View style={styles.filterButtons}>
          {filters.map((filter) => (
            <FilterButton
              key={filter.id}
              label={filter.name}
              iconName={filter.iconName}
              onPress={() => handleFilter(filter.name)}
              selected={selectedFilters.includes(filter.name)}
            />
          ))}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    height: "100%",
    backgroundColor: "#FFFFFF", // 흰색 배경
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  header: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerText: {
    fontSize: 16,
    color: "#555",
  },
  content: {
    padding: 16,
  },
  selected: {
    backgroundColor: "#58A6FF", // 선택된 상태 색상
  },
  buttonText: {
    color: "#333",
  },
  selectedText: {
    color: "#FFFFFF", // 선택된 상태에서의 텍스트 색상
  },
  filterButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: '#F2F2F2',
    margin: 5 ,
  },
});

export default BottomSheet;
