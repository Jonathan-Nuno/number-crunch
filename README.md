# Number Crunch

Next.js frontend for the debt repayment calculator.

## Getting Started

Install dependencies, copy the local configuration, and run the development server:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

`NEXT_PUBLIC_API_URL` must be the public origin of the API. Add the frontend
origin to the API repository's `CORS_ORIGINS` setting as well.

## Verification

```bash
npm run lint
npm run build
npm audit
```
