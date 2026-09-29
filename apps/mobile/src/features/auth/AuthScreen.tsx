import { useState } from "react";
import { Image, Text, View } from "react-native";
import { Screen, Button } from "@/ui";
import { PulseMark } from "./PulseMark";
import { useSocialAuth, type SocialStrategy } from "./useSocialAuth";
import { useWarmUpBrowser } from "./useWarmUpBrowser";

export function AuthScreen() {
  useWarmUpBrowser();
  const { signInWith } = useSocialAuth();
  const [pending, setPending] = useState<SocialStrategy | null>(null);

  const handlePress = async (strategy: SocialStrategy) => {
    setPending(strategy);
    await signInWith(strategy);
    setPending(null);
  };

  return (
    <Screen className="px-6">
      <View className="flex-1 justify-between py-10">
        <View className="mt-16 items-center gap-6">
          <PulseMark />
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-text-primary">
              Pulse Finance
            </Text>
            <Text className="text-center text-base text-text-secondary">
              Track your spending, plan your future.
            </Text>
          </View>
        </View>

        <View className="gap-3">
          <Button
            label="Continue with Google"
            variant="social"
            icon={
              <Image
                source={require("../../../assets/google.png")}
                className="h-5 w-5"
                resizeMode="contain"
              />
            }
            loading={pending === "oauth_google"}
            onPress={() => handlePress("oauth_google")}
          />
          <Button
            label="Continue with Apple"
            variant="social"
            icon={
              <Image
                source={require("../../../assets/apple-logo.png")}
                className="h-5 w-5"
                resizeMode="contain"
              />
            }
            loading={pending === "oauth_apple"}
            onPress={() => handlePress("oauth_apple")}
          />
        </View>

        <Text className="text-center text-xs text-text-secondary">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </Screen>
  );
}
