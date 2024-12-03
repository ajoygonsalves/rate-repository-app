import { FetchResult } from "@apollo/client";
import { GestureResponderEvent } from "react-native";

export interface RepositoryItemProps {
  id: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
  ownerAvatarUrl: string;
}

export interface AppBarTabProps {
  tabName: string;
  to: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export interface AuthenticateInput {
  username: string;
  password: string;
}

export interface AuthStorage {
  getAccessToken(): Promise<string | null>;
  setAccessToken(accessToken: string): Promise<void>;
  removeAccessToken(): Promise<void>;
}

export type SignInFunction = (
  input: AuthenticateInput
) => Promise<FetchResult<{ authenticate: { accessToken: string } }>>;
