import createApolloClient from "@/utils/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";
import Main from "./src/components/Main";
import AuthStorage from "@/utils/authStorage";
import AuthStorageContextProvider from "@/contexts/AuthStorageContext";
import { View } from "react-native";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContextProvider authStorage={authStorage}>
            <Main />
          </AuthStorageContextProvider>
        </ApolloProvider>
      </NativeRouter>

      <StatusBar style="auto" />
    </View>
  );
};

export default App;
