"use client";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function ProductCard({ product }: { product: any }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <article className="bg-[#1e1e1e] text-[#f5f5f5] border border-[#2d2d2d] rounded-2xl shadow-lg p-6 flex flex-col gap-9">
      <div>
        <img src={product.image || '/images/placeholder.png'} className="h-44 w-full object-cover rounded mb-3" />
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm truncate">{product.description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <div>
          <div className="font-bold">S/.{product.price.toFixed(2)}</div>
          <div className="text-xs">Stock: {product.stock}</div>
        </div>
        <div className="flex flex-col gap-2">
          <button className="px-3 py-1 bg-[#2563eb] hover:bg-[#1d4ed8] rounded" onClick={() => addItem({ id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image })} disabled={product.stock <= 0}>Añadir</button>
          <Link href={`/product/${product.id}`} className="text-sm underline">Ver</Link>
        </div>
      </div>
    </article>
  );
}
