import { config } from "dotenv";

config({ quiet: true });

export const { PORT, GOOGLE_CLIENT_ID, JWT_SECRET, JWT_EXPIRE, DB_URI } = process.env;
