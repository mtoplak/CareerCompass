import React from "react";

const SingleJobPage = ({ job }: { job: any }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 py-[200px] dark:bg-black">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          {job.position}
        </h1>
        <p className="mb-6 mt-10 text-gray-600 dark:text-gray-300">
          {job.description}
        </p>
        <b className="text-gray-800 dark:text-gray-200">
          Podrobnosti o prijavi:
        </b>
        <p className="text-md mt-2 text-gray-600 dark:text-gray-400">
          {job.application && job.application.trim() !== ""
            ? job.application
            : "To podjetje ni podalo nobenih podrobnosti. Za več informacij prosim kontaktirajte podjetje."}
        </p>
        <div className="mb-4 mt-10">
          <p className="mb-1 text-gray-600 dark:text-gray-400">
            <b className="text-gray-800 dark:text-gray-200">Lokacija:</b>{" "}
            {job.city}
          </p>
          <p className="mb-1 text-gray-600 dark:text-gray-400">
            <b className="text-gray-800 dark:text-gray-200">Podjetje:</b>{" "}
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-700 underline underline-offset-1 dark:text-indigo-300"
            >
              {job.company}
            </a>
          </p>
          <p className="mb-1 text-gray-600 dark:text-gray-400">
            <b className="text-gray-800 dark:text-gray-200">Vir:</b>{" "}
            {job.source}
          </p>
        </div>
      </div>
    </div>
  );
};
export default SingleJobPage;
