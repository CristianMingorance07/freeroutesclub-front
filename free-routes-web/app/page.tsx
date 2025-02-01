import Link from "next/link";

export default function Page() {
  return (
    <section className="relative flex h-[80vh] flex-col items-center justify-center text-white">
      <div className="absolute top-0 h-full w-full justify-center bg-[url('/img/bg-routes.png')] bg-cover bg-center bg-no-repeat brightness-50"></div>
      <div className="z-10 p-8 text-center">
        <h2 className="mb-4 text-5xl font-bold sm:text-7xl 2xl:text-8xl">
          FREE ROUTES
        </h2>
        <p className="text-2xl sm:text-4xl 2xl:text-5xl">
          La libertad sobre dos ruedas
        </p>
        <div className="flex w-full justify-center">
          <Link href="/trips" className="mx-auto mt-6">
            <button className="rounded-full bg-gradient-to-r from-[#ED0874] to-[#3B74BF] px-8 py-4 text-lg text-white shadow-md transition-opacity hover:opacity-90">
              Consulta nuestras rutas
            </button>
          </Link>
        </div>
        {/* <div className="mt-8 flex gap-4">
          <Link
            href="/trips"
            className="rounded bg-white px-4 py-2 text-black hover:bg-gray-200"
          >
            View Trips
          </Link>
          <Link
            href="/courses"
            className="rounded bg-white px-4 py-2 text-black hover:bg-gray-200"
          >
            Our Courses
          </Link>
        </div> */}
      </div>
    </section>
  );
}
