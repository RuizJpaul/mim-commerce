# Min-Commerce (Tailwind + Next.js App Router + Prisma + Neon)

Project ready to run. Only change DATABASE_URL in .env.

Quick start:
1. Copy .env.example to .env and set DATABASE_URL to your Neon connection string.
2. npm install
3. npx prisma generate
4. npx prisma migrate dev --name init
5. npm run dev

Notes:
- NEXT_PUBLIC_API_BASE_URL defaults to /api so API routes work locally and in Vercel.
- Use `npx prisma studio` to inspect DB.
