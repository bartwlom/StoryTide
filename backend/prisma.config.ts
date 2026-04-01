import { defineConfig } from 'prisma/config'

function getDatabaseUrl(): string {
  return process.env.DATABASE_URL || ''
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: getDatabaseUrl(),
  },
})
