
import React from 'react';

const SingleJobPage = ({ job }: { job: any }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 py-[200px] dark:bg-black">
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {job.position}
          </h1>
          <p className="mt-10 text-gray-600 dark:text-gray-300 mb-6">
            {job.description}
          </p>
          <b className="text-gray-800 dark:text-gray-200">Podrobnosti o prijavi:</b>
            <p className="mt-2 text-md text-gray-600 dark:text-gray-400">
               {job.application}
            </p>
          <div className="mb-4 mt-10">
            <p className="text-gray-600 dark:text-gray-400 mb-1">
              <b className="text-gray-800 dark:text-gray-200">Lokacija:</b> {job.city}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-1">
              <b className="text-gray-800 dark:text-gray-200">Podjetje:</b> {job.company}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-1">
              <b className="text-gray-800 dark:text-gray-200">Vir:</b> {job.source}
            </p>
            
          </div>
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          >
            Podrobnosti
          </a>
        </div>
    </div>
      );
    };
export default SingleJobPage;
