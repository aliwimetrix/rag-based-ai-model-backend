import express, { Router } from "express";
import { createEmbeddings, searchEmbeddings, storeEmbeddings } from "../controllers/embeddings.controller.js";

const embeddings: Router = express.Router();

embeddings.post("/embeddings", createEmbeddings);
embeddings.post("/store-embeddings", storeEmbeddings);
embeddings.post('/search-embeddings', searchEmbeddings);

export default embeddings;
