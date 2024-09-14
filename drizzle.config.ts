import { Config } from 'drizzle-kit';

const config: Config = {
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  out: './drizzle-migrations',
  schema: './db/schema.ts',
  breakpoints: false,
};

export default config;
