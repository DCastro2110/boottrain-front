'use client';

import { type Context, createContext, useContext } from 'react';

export interface IUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  height: number | null;
  weight: number | null;
  age: number | null;
  fitnessLevel: string | null;
  bodyFatPercentage: number | null;
}

export interface IUserContextValue {
  user: IUser | null;
  isLoading: boolean;
}

export const UserContext: Context<IUserContextValue | undefined> =
  createContext<IUserContextValue | undefined>(undefined);

export function useUserContext(): IUserContextValue {
  const context = useContext(UserContext);
  return context ?? { user: null, isLoading: true };
}
