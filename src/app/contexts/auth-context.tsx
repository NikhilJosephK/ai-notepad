"use client";

import { createClient } from "@/utils/supabase/client";
import { createContext, useState, useEffect } from "react";

export const isAuthenticatedContext = createContext<boolean | null>(null);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState<
    boolean | null
  >(false);

  useEffect(() => {
    async function isAuthenticated() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setIsAuthenticatedUser(true);
      } else {
        setIsAuthenticatedUser(false);
      }
    }
    isAuthenticated();
  }, []);

  return (
    <isAuthenticatedContext.Provider value={isAuthenticatedUser}>
      {children}
    </isAuthenticatedContext.Provider>
  );
}
