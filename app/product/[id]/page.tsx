"use client"; // 👈 Esta página necesita interacción del cliente (por el botón)
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    async function loadProduct() {
      try {
        const { id } = await params;
        const apiUrl = "http://localhost:3000/api"
        const res = await fetch(`${apiUrl}/products/${id}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Producto no encontrado");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [params]);

  if (loading) return <p className="text-center text-gray-400 py-10">Cargando producto...</p>;
  if (!product) return <p className="text-center text-red-500 py-10">Error al cargar producto</p>;

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-lg">
        <img
          src={product.image || "/images/placeholder.png"}
          alt={product.name}
          className="w-full md:w-1/2 rounded-lg shadow object-cover"
        />

        <div className="flex flex-col justify-between p-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="mt-3 text-gray-600">{product.description}</p>
          </div>
          <div>
            <div className="mt-6">
              <div className="text-2xl font-semibold text-gray-800">${product.price.toFixed(2)}</div>
              <div className="text-sm text-gray-500">Stock: {product.stock}</div>
            </div>
            <button
              onClick={() =>
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  quantity: 1,
                })
              }
              className="mt-6 bg-white border-2 border-black hover:bg-black hover:text-white transition text-black px-6 py-2 rounded-xl font-semibold"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
