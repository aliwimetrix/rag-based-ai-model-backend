import mongoose from "mongoose";
import chalk from "chalk";

export const DatabaseConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI as string);
    console.info(chalk.green("Database Connected Successfully"));
  } catch (error) {
    console.error(chalk.red("Database Connection Failed"), error);
    process.exit(1);
  }
};
