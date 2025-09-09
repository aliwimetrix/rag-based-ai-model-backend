import type { Request, Response } from "express";
import { EmbeddingsModel } from "../models/embeddings.model.js";
import dayjs from "dayjs";

const getDetails = async (req: Request, res: Response) => {
  const response = await EmbeddingsModel.distinct("FileName");
  const data = {
    filesCount: response.length,
    filesName: response.length > 0 ? response : "N/A",
    refreshedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  };
  return res.status(200).json({ ...data });
};

const createEmbeddings = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    if (!data)
      return res.status(400).json({ error: "Missing 'data' in request body" });
    const input = data.map((item: Record<string, any>) =>
      Object.entries(item)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ")
    );
    const cohere = req.app.get("cohere-ai");
    const response = await cohere.embed({
      texts: input,
      model: "embed-v4.0",
    });
    return res.json(response.embeddings);
  } catch (error) {
    console.error("Error creating embeddings:", error);
    return res.status(500).json(error);
  }
};

const storeEmbeddings = async (req: Request, res: Response) => {
  const { data, fileName, importedData } = req.body;
  try {
    const docs = importedData.map((row: any, index: number) => ({
      FileName: fileName,
      FileType: ".xlsx",
      ...row,
      UploadedAt: Date.now(),
      Embeddings: data[index],
    }));
    await EmbeddingsModel.insertMany(docs);
    return res.status(200).json({ message: "Data Submitted Successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const searchEmbeddings = async (req: Request, res: Response) => {
  const { data } = req.body;
  try {
    const cohere = req.app.get("cohere-ai");
    const queryEmbeddings = await cohere.embed({
      texts: [data],
      model: "embed-v4.0",
    });
    const response = await EmbeddingsModel.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",
          queryVector: queryEmbeddings.embeddings[0],
          path: "Embeddings",
          numCandidates: 100,
          limit: 5,
        },
      },
    ]);
    const groq = req.app.get("groq");
    const query = response.map((item) => {
      const { Embeddings, ...rest } = item;
      return rest;
    });
    const result = await groq.chat.completions.create({
      model: "gemma2-9b-it",
      messages: [
        {
          role: "user",
          content: `Here is the data: ${JSON.stringify(
            query[0]
          )}\nQuestion: ${data}?`,
        },
      ],
      temperature: 1,
      max_completion_tokens: 512,
    });
    return res
      .status(200)
      .json({ response: result.choices[0]?.message.content });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteEmbeddings = async (req: Request, res: Response) => {
  await EmbeddingsModel.deleteMany({});
  return res.status(200).json({ message: "Deleted Successfully!" });
};

export {
  getDetails,
  createEmbeddings,
  storeEmbeddings,
  searchEmbeddings,
  deleteEmbeddings,
};
