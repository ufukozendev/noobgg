import { Hono } from "hono";
import {
  getAllDistributorsController,
  getDistributorByIdController,
  createDistributorController,
  updateDistributorController,
  deleteDistributorController,
} from "../controllers/distributors.controller";

const distributors = new Hono().basePath("/distributors");

distributors.get("/", getAllDistributorsController);
distributors.get("/:id", getDistributorByIdController);
distributors.post("/", createDistributorController);
distributors.put("/:id", updateDistributorController);
distributors.delete("/:id", deleteDistributorController);

export default distributors;