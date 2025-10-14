"use client";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.removeItem);
  const update = useCartStore((s) => s.updateItem);
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="px-14 py-10">
      <h2 className="text-2xl text-white font-semibold mb-4">Carrito</h2>
      {items.length === 0 ? (
        <div className="p-6 bg-[#2d2d2d] rounded-2xl shadow text-white text-center">
          <p>Tu carrito está vacío.</p>
          <Link href="/catalog" className="mt-4 inline-block text-blue-600 underline">Ir al catálogo</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {items.map(it => (
              <div key={it.id} className="flex items-center gap-4 p-4 bg-[#2d2d2d] rounded-2xl shadow">
                <img src={it.image || '/images/placeholder.png'} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold text-white">{it.name}</div>
                  <div className="text-sm text-white">${it.price.toFixed(2)}</div>
                  <div className="mt-2">
                    <input type="number" min={1} value={it.quantity} onChange={(e) => update(it.id, Number(e.target.value))} className="w-20 border rounded px-2 py-1" />
                  </div>
                </div>
                <div>
                  <button className="text-red-600" onClick={() => remove(it.id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
          <aside className="p-6 bg-white rounded-lg shadow flex flex-col justify-between">
            <div className="font-semibold">Resumen</div>
            <div>
              <div className="mt-4">Total: <strong>${total.toFixed(2)}</strong></div>
              <Link href="/checkout" className="mt-4 block px-4 py-2 bg-white border-2 border-black text-black font-medium rounded-2xl text-center">Checkout</Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
