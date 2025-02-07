import Link from "next/link";

export default function Cta({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href} className="mx-auto mt-6">
      <button className="rounded-full bg-gradient-to-r from-[#ED0874] to-[#3B74BF] px-8 py-4 text-lg text-white shadow-md transition-transform hover:scale-105">
        {text}
      </button>
    </Link>
  );
}
