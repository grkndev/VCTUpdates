import { Fonts } from "@/hooks/fonts";

import { Text, View } from "react-native";
export default function Card({
  team,
  date,
  content,
}: {
  team: string;
  date: string;
  content: string;
}) {
  return (
    <View className="bg-[#161616] gap-4 p-5 rounded-3xl border-2 border-[#202020]">
      <View className="flex flex-row items-center justify-between w-full">
        <Text
          className="text-zinc-500 text-sm"
          style={{ fontFamily: Fonts.Semibold }}
        >
          {team}
        </Text>
        <Text
          className="text-zinc-500 text-xs"
          style={{ fontFamily: Fonts.Semibold }}
        >
          {date}
        </Text>
      </View>
      <View>
        <Text className="text-white" style={{ fontFamily: Fonts.Bold }}>
          {
            content
          }
        </Text>
      </View>
    </View>
  );
}
