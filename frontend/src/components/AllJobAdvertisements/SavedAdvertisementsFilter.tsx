"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const SavedJobAdvertisementsFilter = ({
  isSavedPage,
}: {
  isSavedPage: boolean;
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleClick = () => {
    if (isSavedPage) {
      router.push("/zaposlitve");
    } else {
      router.push("/shranjene-zaposlitve");
    }
  };

  return (
    <form action="#">
      <section
        id="saved-jobs"
        className="flex flex-col items-center bg-gray-1 pt-4 dark:bg-dark-2"
      >
        {session?.user && (
          <button
            type="button"
            onClick={handleClick}
            className="focus:shadow-outline col-span-1 rounded bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500 focus:outline-none md:col-span-1 lg:col-span-1"
          >
            <div className="flex items-center justify-center">
              <span>
                {isSavedPage
                  ? "Prikaži vse zaposlitvene oglase"
                  : "Prikaži shranjene zaposlitve"}
              </span>
            </div>
          </button>
        )}
      </section>
    </form>
  );
};

export default SavedJobAdvertisementsFilter;
