import Link from "next/link";

export default function Home() {
  return (
    <div className="flex">
      <div className="bg-[#1f1f1f] w-[35%] p-20 flex flex-col justify-center items-center gap-24">
        <div className="text-center">
          <h1 className="text-4xl text-white mb-4">Bienvenido</h1>
          <p className="text-lg mb-8 text-center text-[#7d7d7d]">Descubre los mejores productos al mejor precio. Calidad, confianza y envío rápido a todo el país.</p>
        </div>
        <div className="flex justify-center gap-4">
          <Link href="/catalog" className="px-6 py-3 bg-white text-black text-black font-medium rounded-2xl shadow">Ir al Catálogo</Link>
          {/* <Link href="/checkout" className="px-6 py-3 border rounded-md">Checkout</Link> */}
        </div>
      </div>
      <div className="bg-[url('/images/fondo.jpg')] bg-contain bg-no-repeat bg-right-bottom w-[65%] h-[85vh] text-center py-16">
      </div>
    </div>
  );
}
