import mongoose from "mongoose";

const EmbeddingsSchema = new mongoose.Schema({}, { strict: false });

const EmbeddingsModel = mongoose.model("EmbeddingsModel", EmbeddingsSchema, 'embeddings');

export { EmbeddingsModel };
