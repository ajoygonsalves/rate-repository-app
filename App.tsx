import { NativeRouter } from "react-router-native";
import Main from "./src/components/Main";
import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "@/utils/apolloClient";

const App = () => {
  const apolloClient = createApolloClient();
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <NativeRouter>
          <Main />
        </NativeRouter>
      </ApolloProvider>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
