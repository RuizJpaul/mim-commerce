import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ Nuevo formato: el segundo argumento es "context" (no se desestructura directamente)
export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const id = Number(context.params.id);
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Error fetching product" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const id = Number(context.params.id);
    const body = await req.json();

    const updated = await prisma.product.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Error updating product" }, { status: 500 });
  }
}
