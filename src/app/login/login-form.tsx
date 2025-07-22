import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <form className="max-w-md w-full bg-black/50 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 py-7 px-6">
      <p className="text-white text-lg font-bold">Login to your account</p>
      <p className="text-white/80 text-base font-normal mt-2">
        Enter your email below to login to your account
      </p>
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
          className="border border-gray-100 rounded-xl p-3 text-white/80 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-2 mt-7">
        <button
          className="border rounded-xl p-4 text-black bg-white font-bold cursor-pointer hover:bg-white/80 transition-all duration-300"
          formAction={login}
        >
          Login
        </button>
        <button
          className="border rounded-xl p-4 text-white bg-black/30 font-bold cursor-pointer hover:bg-white/80 hover:text-black transition-all duration-300"
          formAction={signup}
        >
          Sign up
        </button>
        {/* <div className="flex justify-center mt-5">
          <p className="text-white/80 text-base font-normal">
            Dont have an account?
          </p>
          <button
            className="text-white text-base font-bold ml-2 underline cursor-pointer hover:text-white/80 transition-all duration-300"
            formAction={signup}
          >
            Sign up
          </button>
        </div> */}
      </div>
    </form>
  );
}
