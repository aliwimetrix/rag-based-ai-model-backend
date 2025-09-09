import http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { CohereClient } from "cohere-ai";
import embeddings from "./routes/embeddings.route.js";
import { DatabaseConnection } from "./db.js";
import chalk from "chalk";
import Groq from "groq-sdk";
import { Server } from "socket.io";

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const cohere = new CohereClient({
  token: process.env.COHERE_AI_EMBED_API_KEY,
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.set("groq", groq);
app.set("cohere-ai", cohere);
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10000mb" }));
app.use("/", embeddings);

DatabaseConnection(io);

server.listen(process.env.PORT, () => {
  console.log(
    chalk.yellowBright(
      `Server Running on http://${process.env.IP}:${process.env.PORT}`
    )
  );
});
