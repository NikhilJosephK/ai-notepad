import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  // const dummyData = [
  //   {
  //     content: "get milk",
  //     createdAt: "sunday",
  //   },
  //   {
  //     content: "dont forget to take book",
  //     createdAt: "monday",
  //   },
  //   {
  //     content: "go to uncles house",
  //     createdAt: "tuesday",
  //   },
  //   {
  //     content: "book tickets for party",
  //     createdAt: "friday",
  //   },
  // ];

  // try {
  //   const dataArr = dummyData.map((item) => {
  //     return item.content + "~" + "~" + item.createdAt;
  //   });

  //   const combinedText = dataArr.join("||");

  //   const response = await fetch(
  //     "https://api.groq.com/openai/v1/chat/completions",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
  //       },
  //       body: JSON.stringify({
  //         messages: [
  //           {
  //             role: "user",
  //             content: `go through the following text, understand the context of ${combinedText} and answer the question. The answer should be precise and to the point and you dont need to show how you arrived at the answer. Answer like how a human would answer. question: when are you going to uncles house?`,
  //           },
  //         ],
  //         model: "compound-beta-mini",
  //         temperature: 0.6,
  //         max_completion_tokens: 1024,
  //       }),
  //     }
  //   );
  //   const data = await response.json();
  //   console.log(data);
  // } catch (error) {
  //   console.log(error);
  // }

  // ////////
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const users = await db.select({ userId: usersTable.userId }).from(usersTable);

  const userExists = users.some((item) => item?.userId === user?.id);
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

