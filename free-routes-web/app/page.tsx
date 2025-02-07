import { FaMapMarkedAlt, FaMotorcycle, FaClock, FaUsers } from "react-icons/fa";
import Cta from "@/components/common/Cta";
import Videos from "@/components/Videos";

export default function Page() {
  return (
    <>
      <section className="relative flex h-[80vh] flex-col items-center justify-center text-white">
        <div className="absolute top-0 h-full w-full justify-center bg-[url('/img/bg-routes-mobile.png')] sm:bg-[url('/img/bg-routes-c.png')] bg-cover bg-center bg-no-repeat brightness-50"></div>
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
          <h3 className="mb-4 text-center text-3xl font-bold">
            Aventuras para recordar
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-center text-lg text-gray-600">
            Embárcate en un viaje repleto de emoción sobre dos ruedas. Conoce
            conoce a más amantes del motor, comparte rutas sorprendentes y
            descubre la libertad de rodar sin límites.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
              <FaMapMarkedAlt className="mb-4 text-4xl text-[#ED0874]" />
              <h4 className="mb-2 text-xl font-semibold">Rutas Impactantes</h4>
              <p className="text-gray-600">
                Nuestras rutas gran incluyen gran variedad de destinos ¡seguro
                que encuentras tu favorita!
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
              <FaMotorcycle className="mb-4 text-4xl text-[#ED0874]" />
              <h4 className="mb-2 text-xl font-semibold">
                Aventura Sin Límites
              </h4>
              <p className="text-gray-600">
                Hacemos rutas on y off-road por los lugares más impresionantes.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
              <FaClock className="mb-4 text-4xl text-[#ED0874]" />
              <h4 className="mb-2 text-xl font-semibold">
                Jornadas Inolvidables
              </h4>
              <p className="text-gray-600">
                Tenemos planes diversos para todo el día, solo nos falta tu
                compañía.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
              <FaUsers className="mb-4 text-4xl text-[#ED0874]" />
              <h4 className="mb-2 text-xl font-semibold">Comunidad Única</h4>
              <p className="text-gray-600">
                Nuestra comunidad es diversa y acogedora, ¡te sentirás como en
                casa!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#0F172A] py-16 text-white">
        <div className="mx-auto max-w-96 sm:max-w-screen-sm text-center">
          <h3 className="mb-4 text-3xl font-bold">
            ¿Qué hacen nuestros riders?
          </h3>
          <p className="mb-6">
            Conecta con la comunidad y vive experiencias como estas:
          </p>
        </div>
        <Videos />
      </section>
    </>
  );
}
