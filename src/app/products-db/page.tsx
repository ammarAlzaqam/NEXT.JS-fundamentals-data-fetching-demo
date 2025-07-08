import connectDB from "@/libs/connectdb";
import Product, { ProductDocument } from "@/models/product";

type Product = {
  id: number;
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
          <h3 className="font-bold">{p.title}</h3>
          <p>{p.description}</p>
          <p>${p.price}</p>
        </div>
      ))}
    </section>
  );
}
