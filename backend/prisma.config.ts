import { defineConfig } from 'prisma/config'

function getDatabaseUrl(): string {
  try {
    return process.env.DATABASE_URL || ''
  } catch {
    return ''
  }
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: getDatabaseUrl(),
  },
})
