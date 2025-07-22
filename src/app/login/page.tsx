import LoginForm from "./login-form";
import Lightning from "@/reactbits/backgrounds/Lightning/Lightning";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] bg-black">
      <div className="w-full h-full relative">
        <Lightning
          hue={220}
          xOffset={0}
          speed={1}
          intensity={1}
          size={1}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 w-full mx-auto flex justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
