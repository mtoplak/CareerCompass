import React from "react";
import Link from "next/link";

const ToastContent = () => {
  return (
    <div>
      Zaposlitven oglas je shranjen.{" "}
      <Link href="/shranjene-zaposlitve">
        <p className="text-indigo-600 underline">Poglej vse shranjene oglase</p>
      </Link>
    </div>
  );
};

export default ToastContent;
