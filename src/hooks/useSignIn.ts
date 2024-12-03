import { AuthStorageContext } from "@/contexts/AuthStorageContext";
import { AUTHENTICATE } from "@/graphql/mutations";
import { AuthenticateInput, SignInFunction } from "@/types/types";
import { MutationResult, useApolloClient, useMutation } from "@apollo/client";
import { useContext } from "react";

const useSignIn = (): [SignInFunction, MutationResult<any>] => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const apolloClient = useApolloClient();

  const authStorage = useContext(AuthStorageContext);

  if (!authStorage) {
    throw new Error("AuthStorageContext is not provided");
  }

  const signIn = async ({ username, password }: AuthenticateInput) => {
    const response = await mutate({
      variables: { username, password },
    });

    if (response.data?.authenticate?.accessToken) {
      await authStorage.setAccessToken(response.data.authenticate.accessToken);
      apolloClient.resetStore();
    }

    return response;
  };

  return [signIn, result];
};

export default useSignIn;
