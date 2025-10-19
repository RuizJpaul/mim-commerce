export default async function OrdersPage() {
  async function getOrders() {
    // Determinar la URL base según el entorno
    const apiUrl = "http://localhost:3000/api";

    const res = await fetch(`${apiUrl}/orders`);

    if (!res.ok) {
      console.error("Error al obtener órdenes:", res.statusText);
      return [];
    }

    return await res.json();
  }
  const orders = await getOrders();

  return (
    <div className="px-14 py-10">
      <h2 className="text-2xl text-white font-semibold mb-4">Historial</h2>
      {orders.length === 0 && <p className="text-white">No hay órdenes aún.</p>}
      <div className="space-y-4">
        {orders.map((o: any) => (
          <div
            key={o.id}
            className="p-4 bg-[#2d2d2d] rounded-2xl shadow hover:bg-[#3a3a3a] transition-colors"
          >
            <div className="flex justify-between">
              <div className="text-white font-medium">Orden {o.id}</div>
              <div className="text-sm text-gray-300">
                {new Date(o.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="mt-3 space-y-1">
              {(Array.isArray(o.items) ? o.items : JSON.parse(o.items)).map(
                (it: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between text-sm text-gray-200"
                  >
                    <div>
                      {it.name} x{it.quantity}
                    </div>
                    <div>S/.{(it.price * it.quantity).toFixed(2)}</div>
                  </div>
                )
              )}
            </div>

            <div className="mt-2 font-bold text-white">
              Total: S/.{o.total.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
