import { Pressable, Text, View } from "react-native";
import { useAuth } from "@clerk/expo";

export default function Dashboard() {
  const { userId, signOut } = useAuth();
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-surface-0 px-6">
      <Text className="text-2xl font-bold text-text-primary">Welcome 👋</Text>
      <Text className="text-sm text-text-secondary">User ID: {userId}</Text>
      <Pressable
        onPress={() => signOut()}
        className="mt-6 rounded-xl bg-expense-600 px-6 py-3"
      >
        <Text
          className="text-center font-semibold"
          style={{ color: "#ffffff" }}
        >
          Logout
        </Text>
      </Pressable>
    </View>
  );
}
