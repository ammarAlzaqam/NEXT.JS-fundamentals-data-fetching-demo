"use client";
import Link from "next/link";
import { RemoveProduct } from "../actions/product";
import { Product } from "./page";
import { useOptimistic } from "react";

export default function ProductsDetail({ products }: { products: Product[] }) {
  const [optimisticProducts, setOptimisticProducts] = useOptimistic(
    products,
    (currentProducts, productId) => {
      return currentProducts.filter((product) => product.id !== productId);
    }
  );

  const handleRemoveProduct = async (productId: string) => {
    setOptimisticProducts(productId);
    await RemoveProduct(productId);
  };

  return (
    <section className="m-10 space-y-10 text-black">
      {optimisticProducts.map((p) => (
        <div key={p.id} className="p-5 rounded-md space-y-3 bg-white">
          <h3 className="font-bold">
            <Link href={`/products-db/${p.id}`}>{p.title}</Link>
          </h3>
          <p>{p.description}</p>
          <p>${p.price}</p>
          <form action={handleRemoveProduct.bind(null, p.id)}>
            <button className="px-5 py-2 cursor-pointer rounded-md text-white bg-red-500 hover:bg-red-700 transition shadow-md">
              DELETE
            </button>
          </form>
        </div>
      ))}
    </section>
  );
}
