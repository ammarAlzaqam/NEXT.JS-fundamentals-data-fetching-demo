"use client";

import Product from "@/models/product";
import { createProductSchema } from "@/utils/validationSchema";
import { redirect } from "next/navigation";
import Submit from "./submit";
import connectDB from "@/libs/connectdb";
import { useActionState } from "react";

type Errors = {
  title?: string;
  price?: string;
  description?: string;
};

type FormState = {
  errors: Errors;
};

export default function AddProductPage() {
  const initialState: FormState = {
    errors: {},
  };
  const [state, formAction, isPending] = useActionState(
    AddProduct,
    initialState
  );
  async function AddProduct(formData: FormData) {
    "use server";

    const title = formData.get("title")?.toString();
    const price = Number(formData.get("price"));
    const description = formData.get("description")?.toString();
    const result = createProductSchema.safeParse({
      title,
      price,
      description,
    });
    if (!result.success) {
      const errors: Errors = {};
      result.error.issues.forEach((issue) => {
        const filed = issue.path[0] as keyof Errors;
        errors[filed] = issue.message;
      });
      return { errors };
    }
    await connectDB();
    await Product.create({ title, price, description });
    redirect("/products-db");
  }

  return (
    <section className="h-screen flex justify-center items-center">
      <form
        action={formAction}
        className="bg-gray-800 px-5 py-8 sm:p-14 rounded-lg shadow-lg shadow-[#fffbf25b] space-y-5 w-full mx-3 sm:max-w-xl sm:mx-0"
      >
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="block bg-white w-full outline-none p-2 text-gray-800 rounded-md focus:bg-amber-50"
          />
          {state.errors.title && (
            <p className="text-red-500">{state.errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            className="block bg-white w-full outline-none p-2 text-gray-800 rounded-md focus:bg-amber-50"
          />
          {state.errors.price && (
            <p className="text-red-500">{state.errors.price}</p>
          )}
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            rows={5}
            id="description"
            name="description"
            className="resize-none block bg-white w-full outline-none p-2 text-gray-800 rounded-md focus:bg-amber-50"
          />
          {state.errors.description && (
            <p className="text-red-500">{state.errors.description}</p>
          )}
        </div>
        {/* <Submit /> */}
        <button
          type="submit"
          disabled={isPending}
          className={`text-center mt-5 w-full bg-blue-500 text-white p-1 cursor-pointer hover:bg-cyan-600 transition rounded-sm ${
            isPending && "bg-gray-700 hover:bg-gray-800"
          }`}
        >
          {isPending ? (
            <div className="flex justify-center items-center">
              <i className="animate-spin w-6 h-6 rounded-full border-2 border-t-transparent border-white"></i>{" "}
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </section>
  );
}
