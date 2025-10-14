async function getOrders() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`, { cache: "no-store" });
  return res.json();
}

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="px-14 py-10">
      <h2 className="text-2xl text-white font-semibold mb-4">Historial</h2>
      {orders.length === 0 && <p>No hay órdenes aún.</p>}
      <div className="space-y-4">
        {orders.map((o: any) => (
          <div key={o.id} className="p-4 bg-[#2d2d2d] rounded-2xl shadow">
            <div className="flex justify-between">
              <div className="text-white">Orden {o.id}</div>
              <div className="text-sm text-white">{new Date(o.createdAt).toLocaleString()}</div>
            </div>
            <div className="mt-3">
              {(Array.isArray(o.items) ? o.items : JSON.parse(o.items)).map((it: any, idx: number)=>(
                <div key={idx} className="flex justify-between text-sm text-white">
                  <div>{it.name} x{it.quantity}</div>
                  <div>S/.{(it.price*it.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="mt-2 font-bold text-white">Total: S/.{o.total.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
