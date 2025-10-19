import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const orders = await prisma.order.findMany()
        return NextResponse.json(orders)
    } catch (error) {
        console.log("Error al obtener ordenes: ", error)
        return NextResponse.json({
            error: "Error al obtener los datos"
        }, { status: 500 })
    }
}

export async function POST(req: Request) {
  try {
    const { items, total } = await req.json();

    if (!items || !Array.isArray(items) || typeof total !== "number") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      for (const it of items) {
        if (!it.id || !it.quantity) throw new Error("Invalid item format");

        const prod = await tx.product.findUnique({ where: { id: it.id } });
        if (!prod) throw new Error(`Producto ${it.id} no existe`);
        if (prod.stock < it.quantity)
          throw new Error(`Stock insuficiente para producto ${it.id}`);

        await tx.product.update({
          where: { id: it.id },
          data: { stock: { decrement: it.quantity } },
        });
      }

      const order = await tx.order.create({
        data: { items, total },
      });

      return order;
    });

    return NextResponse.json(result);
  } catch (error: any) {
    const msg = error?.message || "Error creating order";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}