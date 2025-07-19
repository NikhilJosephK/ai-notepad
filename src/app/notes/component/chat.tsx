"use client";

import { useState } from "react";

type ChatProps = {
  question: string;
  answer: string;
}[];

export default function Chat() {
  const dummyData = [
    {
      content: "get milk",
      createdAt: "sunday",
    },
    {
      content: "dont forget to take book",
      createdAt: "monday",
    },
    {
      content: "go to uncles house",
      createdAt: "tuesday",
    },
    {
      content: "book tickets for party",
      createdAt: "friday",
    },
    {
      content:
        "go to office and meet shiva and tell him to assign me a cab for monday",
      createdAt: "saturday",
    },
  ];

  const [grouped, setGrouped] = useState<ChatProps>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const question = formData.get("question") as string;
    setGrouped([...grouped, { question, answer: "" }]);

    ////////////

    try {
      const dataArr = dummyData.map((item) => {
        return item.content + "~" + "~" + item.createdAt;
      });

      const combinedText = dataArr.join("||");

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
          },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: `go through the following text, understand the context of ${combinedText} and answer the question. The answer should be precise and to the point and you dont need to show how you arrived at the answer. Answer like how a human would answer. question: ${question}`,
              },
            ],
            model: "compound-beta-mini",
            temperature: 0.6,
            max_completion_tokens: 1024,
          }),
        }
      );
      const data = await response.json();
      let lastItem = grouped[grouped.length - 1];
      lastItem = {
        ...lastItem,
        question,
        answer: data.choices[0].message.content,
      };
      setGrouped([...grouped, lastItem]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 ">
      <div className="border border-gray-300 rounded-2xl py-6 px-4  max-w-xl w-full h-[500px] overflow-y-auto  mx-auto">
        {grouped.map((item) => {
          return (
            <div key={Math.random()}>
              <p className="text-sm text-gray-500 border rounded-l-2xl rounded-tr-2xl p-2 max-w-3xs ml-auto">
                {item.question}
              </p>
              {item?.answer && (
                <p className="text-sm text-gray-500 border rounded-r-2xl rounded-tl-2xl p-2 max-w-3xs mt-4">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 max-w-xl w-full mx-auto"
      >
        <input
          type="text"
          placeholder="Ask me anything"
          className="border border-gray-300 rounded-md p-2"
          name="question"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2"
        >
          Ask
        </button>
      </form>
    </div>
  );
}
