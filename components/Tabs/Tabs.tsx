import { Fonts } from "@/hooks/fonts";
import { Pressable, Text, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

type TabItem = {
  code: string;
  label: string;
};
type TabsProps = {
  data: TabItem[];
  selectedIndex: number;
  onChange: (index: number) => void;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
};
const _spacing = 4;
export default function Tabs({
  data,
  selectedIndex,
  onChange,
  activeBackgroundColor = "#303030",
  inactiveBackgroundColor = "transparent",
}: TabsProps) {
  return (
    <View className="flex flex-row gap-1 items-center justify-between">
      {data.map((item, index) => {
        const isSelected = selectedIndex === index;
        return (
          <Animated.View
            key={index}
            layout={LinearTransition.springify().damping(80).stiffness(200)}
          >
            <Pressable
              style={{
                paddingVertical: _spacing * 2,
                paddingHorizontal: _spacing * 3,
                justifyContent: "center",

                alignItems: "center",
                gap: _spacing,
                flexDirection: "row",
                backgroundColor: isSelected
                  ? activeBackgroundColor
                  : inactiveBackgroundColor,
                borderRadius: 8,
              }}
              onPress={() => onChange(index)}
            >
              {/* <Text
                className="text-white"
                style={{
                  fontFamily: Fonts.Semibold,
                }}
              >
                {item.code.toUpperCase()}
              </Text> */}
              <Text
                className="text-white"
                style={{
                  fontFamily: Fonts.Semibold,
                }}
              >
                {item.label.toUpperCase()}
              </Text>
            </Pressable>
          </Animated.View>
        );
      })}
    </View>
  );
}
