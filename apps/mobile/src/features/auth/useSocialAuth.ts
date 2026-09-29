import { useCallback } from "react";
import { useSSO } from "@clerk/expo";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export type SocialStrategy = "oauth_google" | "oauth_apple";

export function useSocialAuth() {
  const { startSSOFlow } = useSSO();

  const signInWith = useCallback(
    async (strategy: SocialStrategy) => {
      try {
        const { createdSessionId, setActive } = await startSSOFlow({
          strategy,
        });
        if (createdSessionId && setActive) {
          await setActive({ session: createdSessionId });
          return { succcess: true as const };
        }
        return { success: false as const, reason: "no_reason" as const };
      } catch (error) {
        console.error(`[auth] ${strategy} flow failed`, error);
        return { success: false as const, reason: "error" as const, error };
      }
    },
    [startSSOFlow],
  );

  return { signInWith };
}
