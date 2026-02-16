# two-ten

Minimalist strength training tracker inspired by HIT / Doug McGuff principles.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Prisma ORM + SQLite
- NextAuth (Credentials)
- Recharts

## Features
- Mobile-first layout with centered 420px container and large touch targets.
- Light and dark themes with Art Nouveau-inspired palette and typography.
- Secure credential login.
- Dashboard with latest set stats and recommendation badge.
- Session flow with:
  - editable proposed weight from latest set
  - 5-second countdown
  - effort timer
  - auto-stop at 2:10
  - `-2s` adjusted saved duration
  - Wake Lock API support during active set
  - localStorage chrono recovery after refresh
- Exercise CRUD and per-exercise weight trend chart.
- Prisma migrations and seed data.

## Getting started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env
   ```
3. Run Prisma migration:
   ```bash
   npm run prisma:migrate -- --name init
   ```
4. Seed database:
   ```bash
   npm run prisma:seed
   ```
5. Start dev server:
   ```bash
   npm run dev
   ```

Open http://localhost:3000.

### Seed login
- Email: `demo@example.com`
- Password: `demo1234`

## Notes
- All weights are in lb.
- Recommendation logic:
  - Last duration > 120s => Increase weight (+increment, default 5 lb)
  - Otherwise => Keep weight
