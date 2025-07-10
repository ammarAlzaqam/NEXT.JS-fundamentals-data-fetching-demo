import connectDB from "@/libs/connectdb";
import Product, { ProductDocument } from "@/models/product";
import ProductsDetail from "./product-detail";

export type Product = {
  id: string;
  title: string;
  price: number;
  description: string | null;
};

export default async function ProductsDBPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  await connectDB();
  const filter = query
    ? {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      }
    : {};
  const productsDoc = (await Product.find(filter)) as ProductDocument[];
  const products: Product[] = productsDoc.map((p) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    description: p.description ?? "",
  }));
  return <ProductsDetail products={products} />;
}
