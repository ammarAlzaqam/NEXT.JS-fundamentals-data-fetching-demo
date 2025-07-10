"use server";

import connectDB from "@/libs/connectdb";
import Product from "@/models/product";
import { createProductSchema } from "@/utils/validationSchema";
import { redirect } from "next/navigation";

export type Errors = {
  title?: string;
  price?: string;
  description?: string;
};

export type FormState = {
  errors: Errors;
};

export async function AddProduct(_prevState: FormState, formData: FormData) {
  //   console.log(_prevState);
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

export async function EditProduct(
  id: string,
  _prevState: FormState,
  formData: FormData
) {
  //   console.log(_prevState);
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
  await Product.updateOne({_id: id}, { title, price, description });
  redirect("/products-db");
}
