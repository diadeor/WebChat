import { config } from "dotenv";

config({ quiet: true });

export const { PORT } = process.env;
