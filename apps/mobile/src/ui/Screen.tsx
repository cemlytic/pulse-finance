import type { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenProps {
  children: ReactNode;
  className?: string;
}

export function Screen({ children, className = "" }: ScreenProps) {
  const insets = useSafeAreaInsets();
  return (
    <View className={`flex-1 bg-surface-0 ${className}`}>
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        {children}
      </View>
    </View>
  );
}
