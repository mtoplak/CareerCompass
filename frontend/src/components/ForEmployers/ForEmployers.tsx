import Image from "next/image";
import Link from "next/link";

const ForEmployers = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 py-[200px] dark:bg-black">
      <div className="flex w-full max-w-4xl flex-col space-y-4 md:flex-row md:space-x-8 md:space-y-0">
        <Link href="/za-delodajalce/registracija">
          <div
            className="flex flex-1 flex-col items-center rounded-lg bg-white p-10 shadow-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-indigo-50 dark:bg-dark dark:shadow-none md:flex-row"
            style={{ height: "240px" }}
          >
            <div className="mb-4 flex w-full items-center justify-center sm:w-1/3 md:mb-0">
              <Image
                src="/images/forEmployers/registration.png"
                alt="Registriraj se"
                className="h-auto w-3/4 sm:w-full"
                width="0"
                height="0"
                sizes="100vw"
              />
            </div>
            <div className="flex w-full flex-col items-center sm:ml-8 sm:w-2/3 md:items-start">
              <h2 className="mb-4 text-3xl font-semibold">Registriraj se</h2>
              <p className="text-center md:text-justify">
                Registriraj se kot novo podjetje na naši spletni strani ter
                objavljaj oglase za bodoče delavce.
              </p>
            </div>
          </div>
        </Link>
        <Link href="/za-delodajalce/prevzemi">
          <div
            className="flex flex-1 flex-col items-center rounded-lg bg-white p-10 shadow-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-indigo-50 dark:bg-dark dark:shadow-none md:flex-row"
            style={{ height: "240px" }}
          >
            <div className="mb-4 flex w-full items-center justify-center sm:w-1/3 md:mb-0">
              <Image
                src="/images/forEmployers/claim.png"
                alt="Prevzemi profil"
                className="h-auto w-3/4 sm:w-full"
                width="0"
                height="0"
                sizes="100vw"
              />
            </div>
            <div className="flex w-full flex-col items-center sm:ml-8 sm:w-2/3 md:items-start">
              <h2 className="mb-4 text-3xl font-semibold">Prevzemi profil</h2>
              <p className="text-center md:text-justify">
                Prevzemi profil podjetja in dostopaj do številnih funkcij, ki ti
                bodo pomagale najti najboljše kandidate za tvojo ekipo.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ForEmployers;
