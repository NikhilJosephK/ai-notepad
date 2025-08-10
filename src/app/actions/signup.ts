"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

type SignupProps = {
  formData: {
    email: string;
    password: string;
  };
};

export async function SignupAction({ formData }: SignupProps) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return "Signup Failed!";
  }

  revalidatePath("/", "layout");
  redirect("/");
}
