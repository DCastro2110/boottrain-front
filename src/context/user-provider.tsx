'use client';

import { type ReactNode, useEffect, useState } from 'react';

import { authClient } from '@/lib/auth-client';

import { type IUser, type IUserContextValue, UserContext } from './user-context';

interface IUserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: IUserProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setUser({
            id: session.data.user.id,
            name: session.data.user.name,
            email: session.data.user.email,
            image: session.data.user.image ?? null,
            age: session.data.user.age ?? null,
            height: session.data.user.height ?? null,
            weight: session.data.user.weight ?? null,
            fitnessLevel: session.data.user.fitnessLevel ?? null,
            bodyFatPercentage: session.data.user.bodyFatPercentage ?? null,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);

  const value: IUserContextValue = { user, isLoading };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
