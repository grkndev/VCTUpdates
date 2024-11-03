import { Fonts } from "@/hooks/fonts";
import { cn } from "@/lib/utils";

import { Pressable, Text, View } from "react-native";
export default function TeamCard({
  children,
  className: cs = "",
  onPress,
}: {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "bg-[#161616] gap-4 p-5 rounded-3xl border-2 border-[#202020]",
        cs
      )}
    >
      {children}
    </Pressable>
  );
}
