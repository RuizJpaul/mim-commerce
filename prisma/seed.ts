import prisma from "../lib/prisma";

async function main() {
  const products = [
    { name: "Camiseta", description: "Algodón 100%", price: 15.99, image: "/images/camiseta.jpg", stock: 50 },
    { name: "Pantalón", description: "Jean clásico", price: 39.99, image: "/images/pantalon.jpg", stock: 20 },
    { name: "Gorro", description: "Gorro deportivo", price: 9.99, image: "/images/gorro.jpg", stock: 100 },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { name: p.name },
      update: {},
      create: p,
    });
  }

  console.log("Seed finished");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
