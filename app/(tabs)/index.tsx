import Card from "@/components/Card";
import Header from "@/components/Header";
import { Fonts } from "@/hooks/fonts";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <SafeAreaView className="p-4 gap-8 flex">
      <Header title={"UPDATES"} lastUpdate={"02 Nov 2024 23:14"} />
      <FlatList
        data={["", "", "", "", "", ""]}
        keyExtractor={(_, i) => i.toString()}
        contentContainerClassName="flex gap-4"
        className=" h-[90%]"
        renderItem={({ index }) => (
          <Card
            team={"BBL Esports"}
            date={"2 Nov 2024 11:24"}
            content={
              'DOĞUKAN "QutionerX" DURAL roster status was changed from Active to Reserve'
            }
          />
        )}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 1000);
            }}
            refreshing={isLoading}
          />
        }
      />
    </SafeAreaView>
  );
}
