import Product, { ProductDocument } from "@/models/product";
import { notFound } from "next/navigation";
import EditProductForm from "./product-edit-form";
import connectDB from "@/libs/connectdb";
import { Product as ProductType } from "../page";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectDB();
  const productDoc = (await Product.findById(id)) as ProductDocument;
  if (!productDoc) notFound();
  const product: ProductType = {
    id: productDoc.id,
    title: productDoc.title,
    price: productDoc.price,
    description: productDoc.description ?? "",
  };
  return <EditProductForm product={product} />;
}
