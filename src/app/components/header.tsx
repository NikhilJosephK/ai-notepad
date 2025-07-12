import Link from "next/link";
import SignoutBtn from "./signout-btn";

export default async function Header() {
  return (
    <nav className="flex border-b border-gray-200 p-4 fixed top-0 left-0 right-0 z-10 bg-white">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-xl font-bold"
        >
          Home
        </Link>
        <Link
          href="/notes"
          className="text-xl font-bold"
        >
          Notes
        </Link>
      </div>
      <div className="ml-auto">
        <SignoutBtn />
      </div>
    </nav>
  );
}
