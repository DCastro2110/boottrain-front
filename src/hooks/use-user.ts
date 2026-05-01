'use client';

import { useContext } from 'react';

import { type IUser,UserContext } from '@/context/user-context';

export function useUser(): IUser | null {
  const context = useContext(UserContext);
  return context?.user ?? null;
}