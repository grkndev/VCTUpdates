import { Fonts } from "@/hooks/fonts";
import { Image, Text, View } from "react-native";
export default function Header({
  title,
  lastUpdate,
}: {
  title: string;
  lastUpdate: string;
}) {
  return (
    <View className="flex flex-row items-center justify-between w-full">
      <View className="flex flex-row items-center justify-center">
        <Image
          source={require("@/assets/images/VCTLOGO.png")}
          className="w-24 aspect-video object-contain"
        />
        <Text
          className="text-[#C5B174] text-2xl font-semibold"
          style={{
            fontFamily: Fonts.Bold,
          }}
        >
          {title}
        </Text>
      </View>
      <View className="flex flex-col items-end justify-center">
        <Text
          className="text-xs text-zinc-500"
          style={{
            fontFamily: Fonts.Semibold,
          }}
        >
          Last Update
        </Text>
        <Text
          className="text-xs text-zinc-500"
          style={{
            fontFamily: Fonts.Semibold,
          }}
        >
          {lastUpdate}
        </Text>
      </View>
    </View>
  );
}
