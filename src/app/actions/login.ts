"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

type LoginProps = {
  formData: {
    email: string;
    password: string;
  };
};

export async function LoginAction({ formData }: LoginProps) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return "Wrong Credentials!";
  }

  revalidatePath("/", "layout");
  redirect("/");
}
