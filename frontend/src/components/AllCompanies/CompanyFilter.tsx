const CompanyFilter = () => {
  return (
    <section
      id="company-filter"
      className="bg-gray-1 pb-8 pt-10 dark:bg-dark-2 lg:pb-[70px] "
    >
      <div className="gap-4-4 container grid rounded-xl bg-gray-100 dark:bg-gray-600 xs:px-[20px] xs:py-[20px] sm:grid-cols-4 lg:grid-cols-6">
        <div className="mx-2 flex rounded-md xs:pb-[5px] sm:col-span-2 lg:col-span-2">
          <input
            type="text"
            placeholder="Vnesi ime..."
            className="flex-grow rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div className="mx-2 flex rounded-md xs:pb-[5px] sm:col-span-2 lg:col-span-2">
          <input
            type="text"
            placeholder="Vnesi lokacijo..."
            className="flex-grow rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div className="mx-2 flex rounded-md xs:pb-[5px] sm:col-span-4 lg:col-span-2">
          <select
            id="country"
            name="country"
            className="flex-grow rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
          >
            <option>Software Development</option>
            <option>Faculty</option>
            <option>Bank</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default CompanyFilter;
