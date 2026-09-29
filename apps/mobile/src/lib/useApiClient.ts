import { useMemo } from "react";
import { useAuth } from "@clerk/expo";
import { createApiClient } from "./api-client";

export function useApiClient() {
  const { getToken } = useAuth();
  return useMemo(() => createApiClient(getToken), [getToken]);
}
