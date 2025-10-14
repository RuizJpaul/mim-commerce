import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Min-Commerce",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-[#050505]">
        <Navbar />
        <main className="">{children}</main>
      </body>
    </html>
  );
}
