"use client";

export default function LoginForm() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log(formData.get("username"));
  }

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="flex flex-col gap-4 w-[300px] mx-auto"
    >
      <input
        type="text"
        placeholder="Username"
        name="username"
        className="border-2 border-gray-300 rounded-md p-2"
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        className="border-2 border-gray-300 rounded-md p-2"
      />
      <button
        className="bg-blue-500 text-white rounded-md p-2"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
