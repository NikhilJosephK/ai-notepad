"use server";

import { db } from "@/db";
import { userNotesTable } from "@/db/schema";
import { createClient } from "@/utils/supabase/server";
import { eq } from "drizzle-orm";

export async function getNotes() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userNotes = await db
    .select()
    .from(userNotesTable)
    .where(eq(userNotesTable.userId, user?.id || ""));

  return userNotes;
}
