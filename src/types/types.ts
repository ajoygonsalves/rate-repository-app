import { FetchResult } from "@apollo/client";

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
}

export interface AuthenticateInput {
  username: string;
  password: string;
}

export type SignInFunction = (
  input: AuthenticateInput,
) => Promise<FetchResult<{ authenticate: { accessToken: string } }>>;
