"use client";

import { getNotes } from "@/app/actions/get-notes";
import { useState, useRef } from "react";
import Aurora from "@/reactbits/backgrounds/Aurora/Aurora";
import getAiResponse from "@/app/actions/get-ai-response";

type ChatProps = {
  question: string;
  answer: string;
}[];

export default function Chat({ isOpen }: { isOpen: boolean }) {
  const formQuestion = useRef<HTMLInputElement>(null);
  const [grouped, setGrouped] = useState<ChatProps>([]);
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSendButtonDisabled(true);
    const question = formQuestion.current?.value as string;
    setGrouped([...grouped, { question, answer: "" }]);
    const userData = await getNotes();
    const dataArr = userData.map((item) => {
      return item.title + "~" + item.content + "~" + item.createdAt;
    });

    const combinedText = dataArr.join("||");
    try {
      const data = await getAiResponse({ question, combinedText });
      let lastItem = grouped[grouped.length - 1];
      lastItem = {
        ...lastItem,
        question,
        answer: data.choices[0].message.content,
      };
      setGrouped([...grouped, lastItem]);
      if (formQuestion.current) {
        formQuestion.current.value = "";
      }
      setIsSendButtonDisabled(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`flex flex-col gap-4 w-[400px] absolute bottom-28 right-10 z-10 border bg-black  border-gray-300 rounded-2xl overflow-hidden pb-5 ${
        isOpen ? "dropdown-open" : "dropdown-close"
      }`}
    >
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />

      <div className=" py-6 px-4  max-w-xl w-full h-[500px] overflow-y-auto mx-auto -mt-[150px]">
        {grouped.map((item) => {
          return (
            <div key={Math.random()}>
              <p className="text-sm border rounded-l-2xl rounded-tr-2xl p-2 max-w-3xs ml-auto bg-black/20 text-white backdrop-blur-sm mt-4">
                {item.question}
              </p>
              {item?.answer && (
                <p className="text-sm text-white border rounded-r-2xl rounded-tl-2xl p-2 max-w-3xs mt-4 backdrop-blur-sm bg-red-500/50">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 max-w-xl w-full mx-auto justify-center items-center px-4"
      >
        <input
          ref={formQuestion}
          type="text"
          placeholder="Ask me anything"
          className="border-b border-gray-300 p-2 grow text-white focus:outline-none"
          name="question"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!!isSendButtonDisabled}
          className="bg-black text-white rounded-md p-2 basis-[70px] shrink-0 cursor-pointer"
        >
          Go
        </button>
      </form>
    </div>
  );
}
