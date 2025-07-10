import Form from "next/form";

export default function Search() {
  return (
    <Form action="/products-db" className="flex gap-2">
      <input
        type="text"
        name="query"
        placeholder="Search products"
        className="flex-1 px-4 py-2 bg-white border-gray-300 focus:outline-none rounded-lg text-gray-800"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
      >
        Submit
      </button>
    </Form>
  );
}
