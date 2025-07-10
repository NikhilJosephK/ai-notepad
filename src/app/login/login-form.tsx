import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <form className="w-[300px]">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-sm font-normal"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border rounded-2xl p-3"
        />
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <label
          htmlFor="password"
          className="text-sm font-normal"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="border rounded-2xl p-3"
        />
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <button
          className="border rounded-2xl p-4 bg-blue-300"
          formAction={login}
        >
          Log in
        </button>
        <button
          className="border rounded-2xl p-4 bg-green-200"
          formAction={signup}
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
