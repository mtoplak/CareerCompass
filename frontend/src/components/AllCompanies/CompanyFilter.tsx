const CompanyFilter = ({
  ime,
  lokacija,
  dejavnost,
}: {
  ime?: string;
  lokacija?: string;
  dejavnost?: string;
}) => {
  return (
    <form action="/iskanje">
      <section
        id="company-filter"
        className="bg-gray-1 pb-8 pt-10 dark:bg-dark-2 lg:pb-[70px] "
      >
        <div className="gap-4-4 container grid rounded-xl bg-gray-100 dark:bg-gray-600 xs:px-[20px] xs:py-[20px] sm:grid-cols-4 lg:grid-cols-7">
          <div className="mx-2 flex rounded-md xs:pb-[5px] sm:col-span-2 lg:col-span-2">
            <input
              type="text"
              placeholder="Vnesi ime..."
              className="flex-grow rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
              name="ime"
              defaultValue={ime}
            />
          </div>
          <div className="mx-2 flex rounded-md xs:pb-[5px] sm:col-span-2 lg:col-span-2">
            <input
              type="text"
              placeholder="Vnesi lokacijo..."
              className="flex-grow rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
              name="lokacija"
              defaultValue={lokacija}
            />
          </div>
          <div className="mx-2 flex rounded-md xs:pb-[5px] sm:col-span-3 lg:col-span-2">
            <select
              id="industry"
              className="flex-grow rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
              name="dejavnost"
              defaultValue={dejavnost}
            >
              <option value="">Vse</option>
              <option value="Avtomobilizem">Avtomobilizem</option>
              <option value="Dom_in_vrt">Dom in vrt</option>
              <option value="Gostinstvo in turizem">
                Gostinstvo in turizem
              </option>
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
          </div>
          <div className="mx-2 flex rounded-md xs:pb-[5px] sm:col-span-1 lg:col-span-1">
            <button className="focus:shadow-outline flex-grow rounded bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-950 focus:outline-none">
              <div className="flex items-center">
                <img
                  src="/images/hero/compass-icon.png"
                  alt="My Icon"
                  className="mr-2 h-6 w-6"
                />
                <span>Poišči</span>
              </div>
            </button>
          </div>
        </div>
      </section>
    </form>
  );
};

export default CompanyFilter;
