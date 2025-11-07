import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";
import dashboard from "./routes/dashboard.route.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10000mb" }));
app.use("/dashboard", dashboard);


app.listen(process.env.PORT, () => {
  console.log(
    chalk.yellowBright(
      `Server Running on http://${process.env.IP}:${process.env.PORT}`
    )
  );
});
