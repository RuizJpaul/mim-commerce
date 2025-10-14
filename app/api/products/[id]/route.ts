import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ GET
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // 👈 los params ahora son una Promise
) {
  try {
    const { id } = await context.params; // 👈 se usa await aquí
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Error fetching product" }, { status: 500 });
  }
}

// ✅ PATCH
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // 👈 también se usa await aquí
    const body = await req.json();

    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data: body,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Error updating product" }, { status: 500 });
  }
}
