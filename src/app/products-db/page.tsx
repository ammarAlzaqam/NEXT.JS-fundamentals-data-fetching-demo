import connectDB from "@/libs/connectdb";
import Product, { ProductDocument } from "@/models/product";
import Link from "next/link";
import { RemoveProduct } from "../actions/product";

export type Product = {
  id: string;
  title: string;
  price: number;
  description: string | null;
};

export default async function ProductsDBPage() {
  await connectDB();
  const products = (await Product.find()) as ProductDocument[];
  console.log(typeof products);
  return (
    <section className="m-10 space-y-10 text-black">
      {products.map((p) => (
        <div key={p.id} className="p-5 rounded-md space-y-3 bg-white">
          <h3 className="font-bold">
            <Link href={`/products-db/${p.id}`}>{p.title}</Link>
          </h3>
          <p>{p.description}</p>
          <p>${p.price}</p>
          <form action={RemoveProduct.bind(null, p.id)}>
            <button className="px-5 py-2 cursor-pointer rounded-md text-white bg-red-500 hover:bg-red-700 transition shadow-md">
              DELETE
            </button>
          </form>
        </div>
      ))}
    </section>
  );
}
