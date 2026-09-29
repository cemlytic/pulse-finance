import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/expo";

export default function Authlayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/(app)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
