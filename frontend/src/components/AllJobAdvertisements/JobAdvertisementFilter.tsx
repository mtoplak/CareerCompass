import Image from "next/image";

const JobAdvertisementFilter = ({
  delovno_mesto,
  lokacija,
  dejavnost,
}: {
  delovno_mesto?: string;
  lokacija?: string;
  dejavnost?: string;
}) => {
  return (
    <form action="/iskanje-zaposlitev">
      <section id="job-filter" className="bg-gray-1 pb-4 pt-10 dark:bg-dark-2">
        <div className="container mx-auto grid grid-cols-1 items-center justify-between gap-2 rounded-xl bg-gray-100 px-[20px] py-[20px] dark:bg-gray-600 md:grid-cols-2 lg:grid-cols-8">
          <input
            type="text"
            placeholder="Vnesi delovno mesto"
            className="col-span-1 rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none md:col-span-1 lg:col-span-2"
            name="delovno_mesto"
            defaultValue={delovno_mesto}
          />
          <input
            type="text"
            placeholder="Vnesi lokacijo"
            className="col-span-1 rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none md:col-span-1 lg:col-span-2"
            name="lokacija"
            defaultValue={lokacija}
          />
          <select
            id="industry"
            className="col-span-1 rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none md:col-span-1 lg:col-span-3"
            name="dejavnost"
            defaultValue={dejavnost}
          >
            <option value="">Vse dejavnosti</option>
            <option value="Avtomobilizem">Avtomobilizem</option>
            <option value="Dom in vrt">Dom in vrt</option>
            <option value="Gostinstvo in turizem">Gostinstvo in turizem</option>
            <option value="Izobraževanje in kultura">
              Izobraževanje in kultura
            </option>
            <option value="Kmetijstvo">Kmetijstvo</option>
            <option value="Lepota in zdravje">Lepota in zdravje</option>
            <option value="Poslovni svet">Poslovni svet</option>
            <option value="Proizvodnja in obrt">Proizvodnja in obrt</option>
            <option value="Prosti čas">Prosti čas</option>
            <option value="Računalništvo in informatika">
              Računalništvo in informatika
            </option>
          </select>
          <button className="focus:shadow-outline col-span-1 rounded bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500 focus:outline-none md:col-span-1 lg:col-span-1">
            <div className="flex items-center justify-center">
              <Image
                src="/images/hero/compass-icon.png"
                alt="Search Compass Icon"
                className="mr-2 h-6 w-6"
                width="0"
                height="0"
                sizes="100vw"
              />
              <span>Išči</span>
            </div>
          </button>
        </div>
      </section>
    </form>
  );
};

export default JobAdvertisementFilter;
