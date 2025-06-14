This project is an authentication platform built with [Next.js](https://nextjs.org).

## Set up local development environment

1. Install PostgreSQL DB locally.
2. Run SQL scripts in `db/sql` sequentially by the version.
3. Copy the `.env.example` file as the `.env` file and set variables.  
   Required variables:
   - `DATABASE_URL`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
4. Run `pnpm install`.
5. Run `pnpm prisma:generate` to generate the Prisma Client.
6. Run `pnpm prisma:seed` to seed initial data into DB.

## Development Guideline

See [DEVELOPMENT_GUIDELINE.md](DEVELOPMENT_GUIDELINE.md).
