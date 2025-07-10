import { db } from "@/db";
import { usersTable } from "@/db/schema";

export default async function Home() {
  const users = await db.select().from(usersTable);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-center">
        Welcome to AI Notepad! {`{${users[0]?.name}}`}
      </h1>
    </div>
  );
}
