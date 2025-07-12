"use client";

import { useEffect, useState } from "react";
import { addNotes } from "../actions/add-notes";
import { getNotes } from "../actions/get-notes";

type UserDataProps = {
  id: number;
  title: string;
  content: string;
};

export default function NotesPage() {
  const [userData, setUserData] = useState<UserDataProps[] | null>(null);

  useEffect(() => {
    async function hello() {
      const userData = await getNotes();
      setUserData(userData as UserDataProps[]);
    }
    hello();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const noteTitle = formData.get("title");
    const noteContent = formData.get("content");
    const userData = await addNotes({
      title: noteTitle as string,
      content: noteContent as string,
    });
    setUserData(userData as UserDataProps[]);
  };

  return (
    <section className="mt-28">
      <div className="border-b border-gray-300 rounded-md p-4 pb-20">
        <form
          className="flex flex-col gap-4 max-w-2xs w-full mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter title"
              name="title"
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              placeholder="Enter content"
              name="content"
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md p-2 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="grid grid-cols-4 gap-4 px-24 my-10">
        {userData?.map((note: UserDataProps) => (
          <div
            key={note?.id}
            className="border border-gray-300 rounded-md p-4"
          >
            <h2>{note?.title}</h2>
            <p>{note?.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
