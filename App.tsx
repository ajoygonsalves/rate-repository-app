import createApolloClient from "@/utils/apolloClient";
import { ApolloProvider } from "@apollo/client";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";
import Main from "./src/components/Main";

const App = () => {
  const apolloClient = createApolloClient();

  console.log(Constants.expoConfig?.extra);

  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>

      <StatusBar style="auto" />
    </>
  );
};

export default App;
