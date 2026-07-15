import { MockDatabase } from "./mock-db";
import { IDatabase } from "./db-interface";

const DB_TYPE = process.env.DB_TYPE || "mock";

const globalForDb = global as unknown as { db: IDatabase };

let dbInstance: IDatabase;

if (DB_TYPE === "prisma") {
    // For now we use mock as fallback until Prisma is fully implemented
    // dbInstance = new PrismaDatabase(); 
    dbInstance = new MockDatabase(); 
} else {
    dbInstance = new MockDatabase();
}

export const db = globalForDb.db || dbInstance;

if (process.env.NODE_ENV !== "production") globalForDb.db = db;
