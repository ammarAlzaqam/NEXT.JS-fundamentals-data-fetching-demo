"use client";

import { useFormStatus } from "react-dom";

export default function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`text-center mt-5 w-full bg-blue-500 text-white p-1 cursor-pointer hover:bg-cyan-600 transition rounded-sm ${
        pending && "bg-gray-700 hover:bg-gray-800"
      }`}
    >
      {pending ? (
        <div className="flex justify-center items-center">
          <i className="animate-spin w-6 h-6 rounded-full border-2 border-t-transparent border-white"></i>{" "}
        </div>
      ) : (
        "Submit"
      )}
    </button>
  );
}
