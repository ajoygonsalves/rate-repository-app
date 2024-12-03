import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  static removeAccessToken(): (() => void) | PromiseLike<() => void> {
    throw new Error("Method not implemented.");
  }
  private namespace: string;
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken(): Promise<string | null> {
    // Get the access token for the storage
    const token = await AsyncStorage.getItem(`${this.namespace}:token`);
    return token;
  }

  async setAccessToken(accessToken: string): Promise<void> {
    // Add the access token to the storage
    await AsyncStorage.setItem(`${this.namespace}:token`, accessToken);
  }

  async removeAccessToken(): Promise<void> {
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;
