import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const product = await prisma.product.create({ data });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Error creating product" }, { status: 500 });
  }
}
