import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await prisma.product.findMany()
        return NextResponse.json(products)
    } catch (error) {
        console.log("Error al obtener los productos: ", error)
        return NextResponse.json({
            error: "Error al obtener los datos"
        }, { status: 500 })
    }
}