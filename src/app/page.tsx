import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const users = await db.select({ userId: usersTable.userId }).from(usersTable);
  const userExists = users.some((item) => item.userId === user?.id);
  if (user && (users.length === 0 || !userExists)) {
    await db.insert(usersTable).values({
      userId: user.id,
      email: user.email || "",
    });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-center">
        Welcome to AI Notepad! {`{${user?.email}}`}
      </h1>
    </div>
  );
}
