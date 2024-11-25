import { AUTHENTICATE } from "@/graphql/mutations";
import { AuthenticateInput, SignInFunction } from "@/types/types";
import { MutationResult, useMutation } from "@apollo/client";

const useSignIn = (): [SignInFunction, MutationResult<any>] => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }: AuthenticateInput) => {
    return await mutate({
      variables: { username, password },
    });
  };

  return [signIn, result];
};

export default useSignIn;
