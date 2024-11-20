import { ApolloClient, InMemoryCache } from "@apollo/client";
import Constants from "expo-constants";
const createApolloClient = () =>
  new ApolloClient({
    uri: Constants.expoConfig?.extra?.APOLLO_URI,
    cache: new InMemoryCache(),
  });

export default createApolloClient;
