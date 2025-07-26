"use client";

import { useEffect, useState, useRef } from "react";
import { addNotes } from "../actions/add-notes";
import { getNotes } from "../actions/get-notes";
import { deleteNotes } from "../actions/delete-notes";
import { updateNotes } from "../actions/update-notes";
import Silk from "@/reactbits/backgrounds/Silk/Silk";
import { Chat } from "./component";
import RippleGrid from "@/reactbits/backgrounds/RippleGrid/RippleGrid";

type UserDataProps = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
};

export default function NotesPage() {
  const [userData, setUserData] = useState<UserDataProps[] | null | []>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const formTitle = useRef<HTMLInputElement>(null);
  const formContent = useRef<HTMLTextAreaElement>(null);
  const [isSubmitBtnLoading, setIsSubmitBtnLoading] = useState<boolean>(false);
  const [storeSelectedNote, setStoreSelectedNote] = useState<UserDataProps[]>(
    []
  );

  const editInputRef = useRef<HTMLInputElement>(null);
  const editTextAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    async function getNotesOnPageload() {
      const userDataResponse = await getNotes();
      setUserData(userDataResponse as UserDataProps[]);
    }
    getNotesOnPageload();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitBtnLoading(true);
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
    setIsSubmitBtnLoading(false);
  };

  function getDate(dateString: string | Date) {
    const date = new Date(dateString);

    // Options to get day and date only
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDate = date.toLocaleDateString("en-IN", options);
    return formattedDate;
  }

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
              {!isSubmitBtnLoading ? "Add Note" : "Adding..."}
            </button>
          </form>
        </div>
        <div className="overflow-scroll max-2xl:h-[450px] max-sm:h-[400px] relative pb-10">
          {!userData || userData?.length === 0 ? (
            <p className="text-white text-lg font-bold mx-1 pb-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {!userData ? "Loading..." : "No Notes Found"}
            </p>
          ) : (
            <div className="md:columns-3 lg:columns-4 max-sm:columns-1 max-md:columns-2 px-24 max-md:px-4 my-10 gap-4">
              {userData?.map((note: UserDataProps) => {
                return (
                  <div
                    key={note?.id}
                    className="border border-gray-300 rounded-md p-4 mb-4 break-inside-avoid bg-white/10 backdrop-blur-sm relative"
                    onClick={() => {
                      setStoreSelectedNote([note]);
                    }}
                  >
                    {note?.id === storeSelectedNote[0]?.id ? (
                      <input
                        defaultValue={note?.title}
                        className="text-white text-lg font-bold mx-1 border-b pb-1 w-full bg-white/10 rounded-t-md pl-1.5"
                        type="text"
                        ref={editInputRef}
                      />
                    ) : (
                      <h4 className="text-white text-lg font-bold mx-1 border-b pb-1">
                        {note?.title}
                      </h4>
                    )}
                    {note?.id === storeSelectedNote[0]?.id ? (
                      <textarea
                        defaultValue={note?.content}
                        className="text-white text-sm mt-3 mx-1 w-full bg-white/10 rounded-md pl-1.5"
                        ref={editTextAreaRef}
                      />
                    ) : (
                      <p className="text-white text-sm mt-3 mx-1">
                        {note?.content}
                      </p>
                    )}
                    <p className="text-white text-xs mt-3 mx-1 text-right">
                      {getDate(note?.createdAt)}
                    </p>

                    {/* close button */}
                    <button
                      className="absolute top-2 right-2 text-white text-xs w-5 h-5 border aspect-square flex items-center justify-center border-white bg-black/50 backdrop-blur-sm rounded-full cursor-pointer"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();

                        const target = e.currentTarget.parentElement;
                        if (target) {
                          target.style.display = "none";
                        }

                        async function getNotesOnDeletion() {
                          const userDataResponse = await deleteNotes({
                            noteId: note?.id,
                          });
                          setUserData(userDataResponse as UserDataProps[]);
                        }
                        getNotesOnDeletion();
                      }}
                    >
                      x
                    </button>

                    {/* save and cancel button */}
                    {note?.id === storeSelectedNote[0]?.id && (
                      <div className="flex gap-4 items-center mt-2">
                        <button
                          className="text-white cursor-pointer"
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            async function updateEditedNotes() {
                              try {
                                const userDataResponse = await updateNotes({
                                  noteId: note?.id,
                                  title: editInputRef?.current?.value || "",
                                  content:
                                    editTextAreaRef?.current?.value || "",
                                });
                                setUserData(userDataResponse);
                                setStoreSelectedNote([]);
                              } catch (err) {
                                console.log(err);
                              }
                            }
                            updateEditedNotes();
                          }}
                        >
                          Save
                        </button>
                        <button
                          className="text-white cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setStoreSelectedNote([]);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    )}

                    {/*  */}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
