# Photography Portfolio API

Backend service built with NestJS and TypeScript, designed to power a custom photography portfolio platform.

It handles the core business logic, content management, album organization, and data persistence using PostgreSQL with Prisma ORM. The API integrates with Cloudinary for optimized image storage and automatic extraction of technical metadata, including EXIF information from uploaded photographs.

The service is structured to provide a scalable and maintainable foundation for managing high-resolution photography content, private administration workflows, and public portfolio data delivery.

## Project Setup

```bash
pnpm install
```

## Database Setup

Set the `DATABASE_URL` environment variable before running Prisma commands. The seed script uses this value to connect to PostgreSQL.

```bash
export DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Apply the database migrations before seeding:

```bash
npx prisma migrate deploy
```

## Run The Database Seed

Run the Prisma seed command from the project root:

```bash
npx prisma db seed
```

This executes the configured seed script:

```bash
tsx prisma/seed.ts
```

The seed currently creates or updates the default albums using `upsert`, so it can be run more than once without duplicating those albums.

## Compile And Run The Project

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

## Run Tests

```bash
# unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# test coverage
pnpm run test:cov
```
