import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { taskRouter } from "./modules/task/routes/task.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/tasks", taskRouter);

app.listen(process.env.API_PORT, () => {
  console.info(`Server running on port ${process.env.API_PORT}`);
});
