"use server";

import { db } from "@/db";
import { userNotesTable } from "@/db/schema";
import { createClient } from "@/utils/supabase/server";
import { eq } from "drizzle-orm";

type DeleteNotesProps = {
  noteId: number;
};

export async function deleteNotes({ noteId }: DeleteNotesProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await db.delete(userNotesTable).where(eq(userNotesTable.id, noteId));

  const userNotes = await db
    .select()
    .from(userNotesTable)
    .where(eq(userNotesTable.userId, user?.id || ""));

  return userNotes;
}
