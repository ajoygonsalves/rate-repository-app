import createApolloClient from "@/utils/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";
import Main from "./src/components/Main";

const App = () => {
  const apolloClient = createApolloClient();

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
