"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function CatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Cargar productos desde la API
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, { cache: "no-store" });
      const data = await res.json();
      setProducts(data);
      setFiltered(data);
    }
    fetchProducts();
  }, []);

  // Aplicar filtros cuando cambien los valores
  useEffect(() => {
    let temp = products;

    if (search.trim()) {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (minPrice !== "" || maxPrice !== "") {
      const min = parseFloat(minPrice) || 0;
      const max = parseFloat(maxPrice) || Number.MAX_VALUE;
      temp = temp.filter((p) => p.price >= min && p.price <= max);
    }

    setFiltered(temp);
  }, [search, minPrice, maxPrice, products]);

  return (
    <section className="px-14 py-10 text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h2 className="text-2xl font-semibold">Catálogo</h2>

        {/* Controles de filtro */}
        <div className="flex flex-wrap items-center gap-3 bg-gray-800 p-4 rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="px-3 py-2 rounded-lg text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Precio mín."
              className="px-3 py-2 w-28 rounded-lg text-black"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Precio máx."
              className="px-3 py-2 w-28 rounded-lg text-black"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <button
            onClick={() => {
              setSearch("");
              setMinPrice("");
              setMaxPrice("");
              setFiltered(products);
            }}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
          >
            Limpiar
          </button>
        </div>
      </div>

      {/* Listado de productos */}
      {filtered.length === 0 ? (
        <p className="text-gray-300 mt-6">No se encontraron productos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
