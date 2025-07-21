import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { createClient } from "@/utils/supabase/server";
import Orb from "@/reactbits/backgrounds/Orb/Orb";
import DecryptedText from "@/reactbits/text-animations/DecryptedText/DecryptedText";
import TargetCursor from "@/reactbits/animations/TargetCursor/TargetCursor";

export default async function Home() {
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
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-left text-3xl font-normal w-full">
          <div className="flex items-center justify-center gap-2 max-md:flex-col">
            <p className="bitcount-grid-single-100 font-extralight max-sm:text-xl">
              Welcome to AI Notepad,
            </p>
            <DecryptedText
              text={`{${user?.email}}`}
              animateOn="view"
              revealDirection="start"
              speed={200}
              maxIterations={40}
              useOriginalCharsOnly={true}
              className="revealed"
              parentClassName="all-letters"
              encryptedClassName="encrypted text-white"
            />
          </div>
        </div>
        <div>
          <TargetCursor
            spinDuration={2}
            hideDefaultCursor={false}
          />
          <a
            href="/notes"
            className="text-white px-4 py-2 border-white mx-auto flex justify-center w-fit cursor-target"
          >
            Take me to Notepad
          </a>
        </div>
      </div>
    </div>
  );
}

