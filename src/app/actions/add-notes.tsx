"use server";

import { db } from "@/db";
import { userNotesTable } from "@/db/schema";
import { createClient } from "@/utils/supabase/server";
import { eq } from "drizzle-orm";

type AddNotesProps = {
  title: string;
  content: string;
};

export async function addNotes({ title, content }: AddNotesProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await db.insert(userNotesTable).values({
    userId: user?.id || "",
    title: title,
    content: content,
  });

  const userNotes = await db
    .select()
    .from(userNotesTable)
    .where(eq(userNotesTable.userId, user?.id || ""));

  return userNotes;
}
