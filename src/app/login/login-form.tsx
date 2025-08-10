"use client";

import { useRef, useState } from "react";
import { LoginAction } from "@/app/actions/login";
import { SignupAction } from "@/app/actions/signup";

export default function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<null | string>(null);
  const [isSignupLoading, setIsSignupLoading] = useState<null | string>(null);
  const [isLoginFailed, setIsLoginFailed] = useState<null | string>(null);
  const [isSignupFailed, setIsSignupFailed] = useState<null | string>(null);

  async function isLogin(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsLoginFailed(null);
    setIsSignupFailed(null);
    setIsLoading("Loading...");
    const formData = {
      email: emailRef?.current?.value || "",
      password: passwordRef?.current?.value || "",
    };

    const isLoginFailed = await LoginAction({ formData });
    if (isLoginFailed) {
      setIsLoginFailed(isLoginFailed);
      setIsLoading(null);
    }
  }
  async function isSignup(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsSignupFailed(null);
    setIsLoginFailed(null);
    setIsSignupLoading("Loading...");
    const formData = {
      email: emailRef?.current?.value || "",
      password: passwordRef?.current?.value || "",
    };

    const isLoginFailed = await SignupAction({ formData });
    if (isLoginFailed) {
      setIsSignupFailed(isLoginFailed);
      setIsSignupLoading(null);
    }
  }

  return (
    <form className="max-w-md w-full bg-black/50 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 py-7 px-6 relative">
      <p className="text-white text-lg font-bold">Login to your account</p>
      <p className="text-white/80 text-base font-normal mt-2">
        Enter your email below to login to your account
      </p>
      {isLoginFailed ? (
        <p className="text-red-500 text-sm font-normal absolute top-20 left-6 mt-3">
          {isLoginFailed}
        </p>
      ) : isSignupFailed ? (
        <p className="text-red-500 text-sm font-normal absolute top-20 left-6 mt-3">
          {isSignupFailed}
        </p>
      ) : null}
      <div className="flex flex-col gap-2 mt-10">
        <label
          htmlFor="email"
          className="text-white/80 text-base font-normal"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          ref={emailRef}
          className="border border-gray-100 rounded-xl p-3 text-white/80 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <label
          htmlFor="password"
          className="text-white/80 text-base font-normal"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          ref={passwordRef}
          className="border border-gray-100 rounded-xl p-3 text-white/80 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-2 mt-7">
        <button
          className="border rounded-xl p-4 text-black bg-white font-bold cursor-pointer hover:bg-white/80 transition-all duration-300"
          onClick={isLogin}
          type="button"
        >
          {isLoading ? isLoading : "Login"}
        </button>
        <button
          className="border rounded-xl p-4 text-white bg-black/30 font-bold cursor-pointer hover:bg-white/80 hover:text-black transition-all duration-300"
          onClick={isSignup}
          type="button"
        >
          {isSignupLoading ? isSignupLoading : "Sign up"}
        </button>
      </div>
    </form>
  );
}
