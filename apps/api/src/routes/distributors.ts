import { OpenAPIHono } from "@hono/zod-openapi";
import {
  getAllDistributorsRoute,
  getDistributorByIdRoute,
  createDistributorRoute,
  updateDistributorRoute,
  deleteDistributorRoute,
  getAllDistributorsController,
  getDistributorByIdController,
  createDistributorController,
  updateDistributorController,
  deleteDistributorController,
} from "../controllers/distributors.controller";

const distributors = new OpenAPIHono().basePath("/distributors");

// Use OpenAPI routes with existing controllers
distributors.openapi(getAllDistributorsRoute, getAllDistributorsController);
distributors.openapi(getDistributorByIdRoute, getDistributorByIdController);
distributors.openapi(createDistributorRoute, createDistributorController);
distributors.openapi(updateDistributorRoute, updateDistributorController);
distributors.openapi(deleteDistributorRoute, deleteDistributorController);

export default distributors;