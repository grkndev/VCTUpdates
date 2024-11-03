import Header from "@/components/Header";
import Tabs from "@/components/Tabs/Tabs";
import TeamCard from "@/components/TeamCard";
import { Fonts } from "@/hooks/fonts";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomBackdrop from "@/components/CustomBackdrop";
import { useSharedValue } from "react-native-reanimated";
import CustomBackground from "@/components/CustomBackground";
import dayjs from "dayjs";
enum Regions {
  emea,
  americas,
  pacific,
  cn,
}
export default function TeamsScreen() {
  const [selectedRegion, setSelectedRegion] = useState<number>(0);
  const [teams, setTeams] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const getRegion = async (index: number) => {
    const res = await fetch(
      `http://45.155.124.254:3000/region?code=${Regions[index]}`
    );
    const data = await res.json();
    setTeams(data.teams);
    setLastUpdate(Date.now());
  };
  useEffect(() => {
    getRegion(selectedRegion);
  }, [selectedRegion]);

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // variables
  const snapPoints = useMemo(() => ["75%", "95%"], []);
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) return bottomSheetModalRef.current?.close();
  }, []);

  return (
    <SafeAreaView className="w-full p-4">
      <Header
        title={"TEAMS"}
        lastUpdate={dayjs(lastUpdate).format("D MMM YYYY HH:mm")}
      />
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
          <TeamCard
            onPress={() => {
              setSelectedTeam(item);
              handlePresentModalPress();
            }}
            className="w-32 h-32 items-center justify-center flex flex-col"
          >
            <Image
              className="w-16 h-16"
              src="https://owcdn.net/img/65b8ccef5e273.png"
            />
            <Text className="text-white font-bold text-[.6rem] text-center">
              {String(item.team).slice(0, 13)}
            </Text>
          </TeamCard>
        )}
      />
      <BottomSheetModal
        index={1}
        backdropComponent={CustomBackdrop}
        backgroundComponent={CustomBackground}
        snapPoints={snapPoints}
        ref={bottomSheetModalRef}
        handleIndicatorStyle={{ backgroundColor: "#333333" }}
        onChange={handleSheetChanges}
      >
        <BottomSheetView className="px-4 gap-4">
          {selectedTeam &&
            selectedTeam.players.map((player: any, index: number) => (
              <TeamCard key={player.handle} className="gap-2 flex flex-col">
                <Text
                  className="text-white"
                  style={{
                    fontFamily: Fonts.Bold,
                  }}
                >
                  {player.handle}
                </Text>
                <Text
                  className="text-zinc-500"
                  style={{
                    fontFamily: Fonts.Semibold,
                  }}
                >
                  {player.firstName} {player.lastName} | {player.activeStatus}
                </Text>
              </TeamCard>
            ))}
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  );
}
