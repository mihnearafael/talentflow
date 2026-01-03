import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;

// Disable prefetch as it is not supported for "Transaction" pool mode which is common in Supabase
// Use global caching in development to prevent connection exhaustion
let client: postgres.Sql;

if (process.env.NODE_ENV === 'production') {
    client = postgres(connectionString, { prepare: false });
} else {
    if (!(global as any).postgres) {
        (global as any).postgres = postgres(connectionString, { prepare: false });
    }
    client = (global as any).postgres;
}

export const db = drizzle(client, { schema });
export { client };
