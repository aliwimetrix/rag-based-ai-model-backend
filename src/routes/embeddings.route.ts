import express, { Router } from "express";
import { createEmbeddings, deleteEmbeddings, getDetails, searchEmbeddings, storeEmbeddings } from "../controllers/embeddings.controller.js";

const embeddings: Router = express.Router();

embeddings.get('/get-details', getDetails);
embeddings.post("/embeddings", createEmbeddings);
embeddings.post("/store-embeddings", storeEmbeddings);
embeddings.post('/search-embeddings', searchEmbeddings);
embeddings.delete('/delete', deleteEmbeddings);

export default embeddings;
