import connectDB from "@/libs/connectdb";
import Product, { ProductDocument } from "@/models/product";
import ProductsDetail from "./product-detail";

export type Product = {
  id: string;
  title: string;
  price: number;
  description: string | null;
};

export default async function ProductsDBPage() {
  await connectDB();
  const productsDoc = (await Product.find()) as ProductDocument[];
  const products: Product[] = productsDoc.map((p) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    description: p.description ?? "",
  }));
  return <ProductsDetail products={products} />;
}
