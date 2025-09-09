import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { CohereClient } from "cohere-ai";
import embeddings from "./routes/embeddings.route.js";
import { DatabaseConnection } from "./db.js";
import chalk from "chalk";
import Groq from 'groq-sdk'

dotenv.config();

const server = express();

const cohere = new CohereClient({
  token: process.env.COHERE_AI_EMBED_API_KEY,
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

server.set('groq', groq);
server.set("cohere-ai", cohere);
server.use(cors({ origin: "*" }));
server.use(express.json({ limit: '10000mb' }));
server.use("/", embeddings);

DatabaseConnection();

server.listen(process.env.PORT, () => {
  console.log(chalk.yellowBright(`Server Running on http://${process.env.IP}:${process.env.PORT}`));
});
