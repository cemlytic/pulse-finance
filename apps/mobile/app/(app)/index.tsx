import { Text, View } from "react-native";
import { useAuth } from "@clerk/expo";
import { Screen, Button } from "@/ui";

export default function Dashboard() {
  const { userId, signOut } = useAuth();

  return (
    <Screen className="px-6">
      <View className="flex-1 items-center justify-center gap-4">
        <Text className="text-2xl font-bold text-text-primary">Welcome 👋</Text>
        <Text className="text-sm text-text-secondary">User ID: {userId}</Text>
        <Button label="Log Out" variant="danger" onPress={() => signOut()} />
      </View>
    </Screen>
  );
}