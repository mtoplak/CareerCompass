import Image from "next/image";

const CompanyFilter = ({
  ime,
  lokacija,
  dejavnost,
  ocena,
  delovno_mesto,
}: {
  ime?: string;
  lokacija?: string;
  dejavnost?: string;
  ocena?: string;
  delovno_mesto?: boolean;
}) => {
  return (
    <form action="/iskanje">
      <section id="company-filter" className="bg-gray-1 py-4 dark:bg-dark-2">
        <div className="container mx-auto grid grid-cols-1 items-center gap-2 rounded-xl bg-gray-100 px-4 py-4 dark:bg-gray-600 md:grid-cols-2 lg:grid-cols-12">
          <input
            type="text"
            placeholder="Vnesi ime"
            className="col-span-1 rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none lg:col-span-2"
            name="ime"
            defaultValue={ime}
          />
          <input
            type="text"
            placeholder="Vnesi lokacijo"
            className="col-span-1 rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none lg:col-span-2"
            name="lokacija"
            defaultValue={lokacija}
          />
          <select
            id="industry"
            className="col-span-1 rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none lg:col-span-3"
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
          <select
            id="rating"
            className="col-span-1 rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none lg:col-span-2"
            name="ocena"
            defaultValue={ocena}
          >
            <option value="">Vse ocene</option>
            <option>1+</option>
            <option>2+</option>
            <option>3+</option>
            <option>4+</option>
          </select>
          <label className="col-span-1 inline-flex cursor-pointer items-center lg:col-span-2">
            <input
              type="checkbox"
              name="delovno_mesto"
              className="peer sr-only"
              defaultChecked={delovno_mesto}
            />
            <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-indigo-600 rtl:peer-checked:after:-translate-x-full"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Zaposlitveni oglasi
            </span>
          </label>
          <button className="focus:shadow-outline col-span-1 rounded bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500 focus:outline-none lg:col-span-1">
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

export default CompanyFilter;
