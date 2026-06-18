# sentinel-frontend

Findings dashboard for Soroban Sentinel — shows historical fuzz coverage, discovered edge cases, and run status for every PR.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Recharts (coverage charts)
- TanStack Query (data fetching + polling)
- Lucide React (icons)

## Pages

| Route | Description |
|---|---|
| `/` | Dashboard summary — stat cards + recent runs |
| `/runs` | Full run history table |
| `/runs/:id` | Run detail — status, findings, reproducer payloads |
| `/coverage` | Coverage history chart per contract |

## Running locally

```bash
npm install
NEXT_PUBLIC_API_URL=http://localhost:8080 npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8080` | Sentinel backend URL |
