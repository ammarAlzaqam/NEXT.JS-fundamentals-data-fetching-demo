import connectDB from "@/libs/connectdb";
import Product from "@/models/product";
import { createPostSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = createPostSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }
    await connectDB();
    await Product.create(validation.data);
    return NextResponse.json(
      { message: "Post created successfully" },
      { status: 201 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
