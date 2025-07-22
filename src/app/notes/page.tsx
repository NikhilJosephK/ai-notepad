"use client";

import { useEffect, useState, useRef } from "react";
import { addNotes } from "../actions/add-notes";
import { getNotes } from "../actions/get-notes";
import Silk from "@/reactbits/backgrounds/Silk/Silk";
import { Chat } from "./component";
import RippleGrid from "@/reactbits/backgrounds/RippleGrid/RippleGrid";

type UserDataProps = {
  id: number;
  title: string;
  content: string;
};

export default function NotesPage() {
  console.log(process.env.NEXT_PUBLIC_GROQ_API_KEY);
  const [userData, setUserData] = useState<UserDataProps[] | null | []>(null);
  const [isOpen, setIsOpen] = useState(false);
  const formTitle = useRef<HTMLInputElement>(null);
  const formContent = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    async function getNotesOnPageload() {
      const userData = await getNotes();

      setUserData(userData as UserDataProps[]);
    }
    getNotesOnPageload();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const noteTitle = formTitle.current?.value;
    const noteContent = formContent.current?.value;
    const userData = await addNotes({
      title: noteTitle as string,
      content: noteContent as string,
    });
    setUserData(userData as UserDataProps[]);
    if (formTitle.current) {
      formTitle.current.value = "";
    }
    if (formContent.current) {
      formContent.current.value = "";
    }
  };

  return (
    <section className="relative bg-[#4229ff]">
      <div className="w-full h-[100dvh]">
        <Silk
          speed={5}
          scale={1}
          color="#4229ff"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div>
          <Chat isOpen={isOpen} />
          <div className="w-16 h-16 overflow-hidden absolute bottom-10 right-10 z-10 border-1 border-[#4229ff] rounded-full max-sm:right-7">
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="w-full h-full bg-black"
            >
              <RippleGrid
                enableRainbow={false}
                gridColor={isOpen ? "#fff" : "#ff2929"}
                rippleIntensity={0.5}
                gridSize={6}
                gridThickness={15}
                mouseInteraction={true}
                mouseInteractionRadius={1.2}
                opacity={1}
                fadeDistance={5}
                vignetteStrength={5}
              />
            </button>
          </div>
        </div>
        <div className="border-b-4 border-black pt-10 pb-10">
          <form
            className="flex flex-col gap-4 max-w-2xs w-full mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label
                className="text-white"
                htmlFor="title"
              >
                Title
              </label>
              <input
                ref={formTitle}
                type="text"
                id="title"
                placeholder="Enter title"
                name="title"
                className="border border-gray-300 rounded-md p-2 bg-white/10 backdrop-blur-sm text-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-white"
                htmlFor="content"
              >
                Content
              </label>
              <textarea
                ref={formContent}
                id="content"
                placeholder="Enter content"
                name="content"
                className="border border-gray-300 rounded-md p-2 bg-white/10 backdrop-blur-sm text-white"
              />
            </div>
            <button
              type="submit"
              className="bg-[#4229ff]/50 text-white rounded-md p-2 cursor-pointer backdrop-blur-sm"
            >
              Add Note
            </button>
          </form>
        </div>
        <div className="overflow-scroll max-2xl:h-[450px] relative pb-10">
          {!userData || userData?.length === 0 ? (
            <p className="text-white text-lg font-bold mx-1 pb-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {!userData ? "Loading..." : "No Notes Found"}
            </p>
          ) : (
            <div className="md:columns-3 lg:columns-4 max-sm:columns-1 max-md:columns-2 px-24 max-md:px-4 my-10 gap-4">
              {userData?.map((note: UserDataProps) => (
                <div
                  key={note?.id}
                  className="border border-gray-300 rounded-md p-4 mb-4 break-inside-avoid bg-white/10 backdrop-blur-sm"
                >
                  <h4 className="text-white text-lg font-bold mx-1 border-b pb-1">
                    {note?.title}
                  </h4>
                  <p className="text-white text-sm mt-3 mx-1">
                    {note?.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
