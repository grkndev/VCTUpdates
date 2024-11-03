import Card from "@/components/Card";
import Header from "@/components/Header";
import { Fonts } from "@/hooks/fonts";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import dayjs from "dayjs";
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  cancelAnimation,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const opVal = useSharedValue(100);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [updates, setUpdates] = useState<any[]>([]);
  let opStyle = {
    opacity: opVal.value / 100,
  };

  const getUpdates = async () => {
    try {
      setIsLoading(true);
      opVal.value = withRepeat(
        withSequence(
          withTiming(0, { duration: 100 }),
          withTiming(100, { duration: 100 })
        )
      );

      const res = await fetch("http://45.155.124.254:3000/updates");
      const data = await res.json();
      setUpdates(data);
      setLastUpdate(Date.now());
    } catch (error) {
      console.error("Error fetching updates:", error);
    } finally {
      setIsLoading(false);
      cancelAnimation(opVal);
      opVal.value = withTiming(100);
    }
  };

  useEffect(() => {
    getUpdates();
  }, []);

  return (
    <SafeAreaView className="p-4 gap-8 flex">
      <Header
        title={"UPDATES"}
        lastUpdate={dayjs(lastUpdate).format("D MMM YYYY HH:mm")}
      />
      {isLoading && (
        <Animated.Text
          className="text-white "
          style={[opStyle, { fontFamily: Fonts.Bold }]}
        >
          Updating
        </Animated.Text>
      )}
      <FlatList
        data={updates}
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
              getUpdates();
            }}
            refreshing={isLoading}
          />
        }
      />
    </SafeAreaView>
  );
}
