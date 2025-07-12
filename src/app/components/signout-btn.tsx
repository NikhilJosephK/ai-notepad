"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { isAuthenticatedContext } from "@/app/contexts/auth-context";

export default function SignoutBtn() {
  const isAuthenticated = useContext(isAuthenticatedContext);

  const router = useRouter();
  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <>
      {isAuthenticated && (
        <button
          onClick={handleSignOut}
          className="text-xl font-bold ml-2 text-red-500 cursor-pointer"
        >
          Signout
        </button>
      )}
    </>
  );
}
