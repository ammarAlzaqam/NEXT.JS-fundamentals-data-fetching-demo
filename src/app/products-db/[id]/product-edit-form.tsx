"use client";

import { useActionState } from "react";
import { EditProduct, FormState } from "@/app/actions/product";
import { Product } from "../page";

export default function EditProductForm({ product }: { product: Product }) {
  const initialState: FormState = {
    errors: {},
  };
  
  const EditProductWithId = EditProduct.bind(null, product.id);
  const [state, formAction, isPending] = useActionState(
    EditProductWithId,
    initialState
  );

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
            defaultValue={product.title}
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
            defaultValue={product.price}
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
            defaultValue={product.description ?? ""}
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
