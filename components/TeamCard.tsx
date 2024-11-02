import { Fonts } from "@/hooks/fonts";
import { cn } from "@/lib/utils";

import { Text, View } from "react-native";
export default function TeamCard({
  children,
  className: cs = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View
      className={cn(
        "bg-[#161616] gap-4 p-5 rounded-3xl border-2 border-[#202020]",
        cs
      )}
    >
      {children}
    </View>
  );
}
