"use client";

export default function Error({ error }: { error: Error }) {
  console.log(error);
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-red-500 shadow-2xl shadow-red-900 text-2xl">
        Error fetching users data
      </p>
    </div>
  );
}
