const CompanyFilter = () => {
  return (
    <section
  id="company-filter"
  className="bg-gray-1 pb-8 pt-10 dark:bg-dark-2 lg:pb-[70px] "
>
<div className="gap-4-4 container grid lg:grid-cols-6 sm:grid-cols-4 rounded-xl bg-indigo-50 dark:bg-gray-600 xs:px-[20px] xs:py-[20px]">
  <div className="lg:col-span-2 sm:col-span-2 mx-2 flex rounded-md dark:bg-dark-2 xs:pb-[5px]">
    <input
      type="text"
      placeholder="Vstavi naziv..."
      className="flex-grow rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
    />
  </div>
  <div className="lg:col-span-2 sm:col-span-2 mx-2 flex rounded-md dark:bg-dark-2 xs:pb-[5px]">
    <input
      type="text"
      placeholder="Vstavi lokacijo..."
      className="flex-grow rounded-md border px-4 py-2 focus:border-indigo-500 focus:outline-none"
    />
  </div>
  <div className="lg:col-span-2 sm:col-span-4 mx-2 flex rounded-md dark:bg-dark-2 xs:pb-[5px]">
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
