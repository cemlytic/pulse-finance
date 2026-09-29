import { View } from "react-native";

export function PulseMark() {
  return (
    <View className="flex-row items-end gap-1.5">
      <View className="h-6 w-2.5 rounded-full bg-brand-500" />
      <View className="h-10 w-2.5 rounded-full bg-brand-600" />
      <View className="h-16 w-2.5 rounded-full bg-income-500" />
      <View className="h-10 w-2.5 rounded-full bg-brand-600" />
      <View className="h-6 w-2.5 rounded-full bg-brand-500" />
    </View>
  );
}
