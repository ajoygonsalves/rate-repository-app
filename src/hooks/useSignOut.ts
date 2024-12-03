import { AuthStorageContext } from "@/contexts/AuthStorageContext";
import { useApolloClient } from "@apollo/client";
import { useContext } from "react";

const useSignOut = (): (() => Promise<void>) => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  if (!authStorage) {
    throw new Error("AuthStorageContext is not provided");
  }

  const signOut = async () => {
    await authStorage?.removeAccessToken();
    await apolloClient.resetStore();
  };

  return signOut;
};

export default useSignOut;
