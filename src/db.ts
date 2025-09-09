import mongoose from "mongoose";
import chalk from "chalk";

export const DatabaseConnection = async (io?: any) => {
  try {
    await mongoose.connect(process.env.DB_URI as string);
    console.info(chalk.green("Database Connected Successfully"));
    io.on("connection", (socket: any) => {
      socket.emit("db_status", { Status: "Connected" })
    })
  } catch (error) {
    console.error(chalk.red("Database Connection Failed"), error);
    io.on("connection", (socket: any) => {
      socket.emit("db_status", { Status: "Errored" })
    })
    process.exit(1);
  }
};
