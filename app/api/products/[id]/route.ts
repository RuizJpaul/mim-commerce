import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: Request, context: { params: { id: string } }) {
    try {
        const { id } = context.params;
        const products = await prisma.product.findMany()
        const product = products.find((p) => p.id === Number(id))
        if(!product){
            return NextResponse.json({msg: "Producto no encontrado"},{status: 404})
        }
        return NextResponse.json(product);
    } catch (error) {
        console.log("Error al obtener el producto: ", error)
        return NextResponse.json({
            error: "Error al obtener los datos"
        }, { status: 500 })
    }
}