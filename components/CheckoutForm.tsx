"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

const CheckoutSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Correo inválido"),
  address: z.string().min(5, "Dirección demasiado corta"),
});

type FormData = z.infer<typeof CheckoutSchema>;

export default function CheckoutForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(CheckoutSchema),
  });

  const items = useCartStore((s) => s.items);
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();

  async function onSubmit(data: FormData) {
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          customer: data,  // 👈 añadimos los datos del cliente
          items,
          total 
        }),
      });

      const json = await resp.json();
      if (!resp.ok) throw new Error(json.error || "Error creando la orden");

      clearCart();
      router.push("/orders");
    } catch (err: any) {
      alert(err.message || "Error desconocido");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow-md space-y-5 max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800">Datos de envío</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          {...register("name")}
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
        <input
          {...register("email")}
          type="email"
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Dirección</label>
        <input
          {...register("address")}
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
        />
        {errors.address && <p className="text-red-600 text-sm">{errors.address.message}</p>}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <span className="text-lg font-semibold text-gray-800">
          Total: ${total.toFixed(2)}
        </span>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-lg"
        >
          Confirmar compra
        </button>
      </div>
    </form>
  );
}
