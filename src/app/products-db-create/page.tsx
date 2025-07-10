"use client"

import Product from "@/models/product";
import { createProductSchema } from "@/utils/validationSchema";
import { redirect } from "next/navigation";
import Submit from "./submit";
import connectDB from "@/libs/connectdb";

export default function AddProductPage() {
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
    if (!result.success) return;
    await connectDB();
    await Product.create({ title, price, description });
    redirect("/products-db");
  }

  return (
    <section className="h-screen flex justify-center items-center">
      <form
        action={AddProduct}
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
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            className="block bg-white w-full outline-none p-2 text-gray-800 rounded-md focus:bg-amber-50"
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            rows={5}
            id="description"
            name="description"
            className="resize-none block bg-white w-full outline-none p-2 text-gray-800 rounded-md focus:bg-amber-50"
          />
        </div>
        <Submit />
      </form>
    </section>
  );
}
