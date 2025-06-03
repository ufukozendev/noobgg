import { Hono } from "hono";
import {
  anyRouteGETControler,
  anyRoutePOSTControler,
} from "../controllers/any-route.controller";

const anyRoute = new Hono().basePath("/any-route");
anyRoute.get("/", anyRouteGETControler);
anyRoute.post("/", anyRoutePOSTControler);

export default anyRoute;
