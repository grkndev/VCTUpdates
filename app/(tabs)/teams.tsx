import Header from "@/components/Header";
import Tabs from "@/components/Tabs/Tabs";
import TeamCard from "@/components/TeamCard";
import { Fonts } from "@/hooks/fonts";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
enum Regions {
  emea,
  americas,
  pacific,
  cn,
}
export default function TeamsScreen() {
  const [selectedRegion, setSelectedRegion] = useState<number>(0);
  const [teams, setTeams] = useState<any[]>([]);
  const getRegion = async (index: number) => {
    const res = await fetch(
      `http://45.155.124.254:3000/region?code=${Regions[index]}`
    );
    const data = await res.json();
    setTeams(data.teams);
  };
  useEffect(() => {
    getRegion(selectedRegion);
  }, [selectedRegion]);
  return (
    <SafeAreaView className="w-full p-4">
      <Header title={"TEAMS"} lastUpdate={"02 Nov 2024 23:14"} />
      <View className="bg-[#222222] rounded-xl p-2 mt-4">
        <Tabs
          data={[
            { label: "EMEA", code: "eu" },
            { label: "Americas", code: "am" },
            { label: "Pacific", code: "pc" },
            { label: "CN", code: "cn" },
          ]}
          onChange={(index) => setSelectedRegion(index)}
          selectedIndex={selectedRegion}
        />
      </View>
      <FlatList
        numColumns={3}
        data={teams}
        className="w-full pt-4 h-full "
        columnWrapperClassName="flex flex-row justify-between items-start"
        keyExtractor={(item, index) => "listitem#" + index.toString()}
        contentContainerStyle={{
          gap: 16,
          justifyContent: "flex-start",
        }}
        renderItem={({ item }) => (
          <TeamCard className="w-32 items-center justify-center flex flex-col">
            <Image
              className="w-16 h-16"
              src="https://owcdn.net/img/65b8ccef5e273.png"
            />
            <Text className="text-white font-bold text-xs text-center">
              {String(item.team).slice(0, 13)}
            </Text>
          </TeamCard>
        )}
      />
    </SafeAreaView>
  );
}
