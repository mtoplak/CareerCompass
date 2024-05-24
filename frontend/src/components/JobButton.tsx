"use client";
import { toast } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import { api } from "@/constants";
import { useSession } from "next-auth/react";
import ToastContent from "./ToastContent";
import { useState } from "react";

const JobActions = ({
  job,
  isSaved: initialIsSaved,
}: {
  job: any;
  isSaved: boolean;
}) => {
  const { data: session } = useSession();
  const { _id, position, company } = job;
  const [isSaved, setIsSaved] = useState(initialIsSaved);

  const handleDelete = async () => {
    confirmAlert({
      message: `Ste prepričani, da želite izbrisati zaposlitveni oglas ${position}?`,
      buttons: [
        {
          label: "Da",
          onClick: async () => {
            try {
              const response = await fetch(`${api}/job/${_id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              });

              if (!response.ok) {
                throw new Error("Doesn't work");
              }

              toast.success("Zaposlitveni oglas je uspešno izbrisan.");
              window.location.reload();
            } catch (error) {
              toast.error("Prišlo je do napake pri brisanju oglasa.");
            }
          },
        },
        {
          label: "Ne",
          onClick: () => {},
        },
      ],
    });
  };

  const handleSave = async () => {
    if (!session?.user?.email) {
      toast.error("User email is missing");
      return;
    }
    try {
      const response = await fetch(
        `${api}/job/save/${_id}/${session.user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error text:", errorText);
        throw new Error(errorText || "Failed to save job");
      }

      toast.success(<ToastContent />);
      setIsSaved(true);
    } catch (error) {
      console.error("There was a problem with the save operation:", error);
      toast.error(`Prišlo je do napake pri shranjevanju`);
    }
  };

  const handleUnsave = async () => {
    if (!session?.user?.email) {
      toast.error("User email is missing");
      return;
    }

    try {
      const response = await fetch(
        `${api}/job/unsave/${_id}/${session.user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error text:", errorText);
        throw new Error(errorText || "Failed to unsave job");
      }

      toast.success("Oglas je uspešno odstranjen iz shranjenih oglasov.");
      setIsSaved(false);
    } catch (error) {
      toast.error(`Prišlo je do napake`);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="mt-4 flex justify-end">
      {session.user.company && session.user.name === company ? (
        <button
          onClick={handleDelete}
          className="rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500"
        >
          Izbriši
        </button>
      ) : session.user.company ? null : (
        <>
          {!isSaved ? (
            <button
              onClick={handleSave}
              className="rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500"
            >
              Shrani oglas
            </button>
          ) : (
            <button
              onClick={handleUnsave}
              className="ml-2 rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500"
            >
              Odstrani oglas
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default JobActions;
