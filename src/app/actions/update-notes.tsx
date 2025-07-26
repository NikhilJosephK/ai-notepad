"use server";

import { db } from "@/db";
import { userNotesTable } from "@/db/schema";
import { createClient } from "@/utils/supabase/server";
import { eq } from "drizzle-orm";

type UpdateNotesProps = {
  noteId: number;
  title: string;
  content: string;
};

export async function updateNotes({
  noteId,
  title,
  content,
}: UpdateNotesProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(noteId, title, content);
  await db
    .update(userNotesTable)
    .set({
      userId: user?.id || "",
      title: title,
      content: content,
    })
    .where(eq(userNotesTable.id, noteId));

  const userNotes = await db
    .select()
    .from(userNotesTable)
    .where(eq(userNotesTable.userId, user?.id || ""));

  return userNotes;
}
