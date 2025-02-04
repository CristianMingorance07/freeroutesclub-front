import { FaMapMarkedAlt, FaMotorcycle, FaClock, FaUsers } from "react-icons/fa";
import Cta from "@/components/common/Cta";

export default function Page() {
  return (
    <>
      <section className="relative flex h-[80vh] flex-col items-center justify-center text-white">
        <div className="absolute top-0 h-full w-full justify-center bg-[url('/img/bg-routes.png')] bg-cover bg-center bg-no-repeat brightness-50"></div>
        <div className="z-10 p-8 text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl 2xl:text-7xl">
            WE RIDERS TRAVEL
          </h2>
          <p className="text-2xl sm:text-3xl 2xl:text-5xl">
            La libertad sobre dos ruedas
          </p>
          <div className="flex w-full justify-center">
            <Cta href={"/trips"} text={"Explora nuestras rutas"} />
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h3 className="mb-12 text-center text-3xl font-bold">
            Aventuras para recordar
          </h3>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-600">
            Embárcate en un viaje repleto de emoción sobre dos ruedas. Conoce a
            nuevos amigos, comparte rutas sorprendentes y descubre la libertad
            de rodar sin límites.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
              <FaMapMarkedAlt className="mb-4 text-4xl text-[#ED0874]" />
              <h4 className="mb-2 text-xl font-semibold">Rutas Impactantes</h4>
              <p className="text-gray-600">
                Admira paisajes inigualables y sumérgete en la verdadera esencia
                de cada destino.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
              <FaMotorcycle className="mb-4 text-4xl text-[#ED0874]" />
              <h4 className="mb-2 text-xl font-semibold">
                Aventura Sin Límites
              </h4>
              <p className="text-gray-600">
                Explora carreteras y caminos ocultos en motocicleta, cargados de
                adrenalina y sorpresas.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
              <FaClock className="mb-4 text-4xl text-[#ED0874]" />
              <h4 className="mb-2 text-xl font-semibold">
                Jornadas Inolvidables
              </h4>
              <p className="text-gray-600">
                Disfruta de múltiples días y noches llenas de diversión,
                compañerismo y paisajes únicos.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
              <FaUsers className="mb-4 text-4xl text-[#ED0874]" />
              <h4 className="mb-2 text-xl font-semibold">Comunidad Única</h4>
              <p className="text-gray-600">
                Conecta con otros amantes de la aventura y crea recuerdos que
                durarán toda la vida.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
