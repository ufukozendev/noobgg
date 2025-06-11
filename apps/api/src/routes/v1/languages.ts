import { Hono } from "hono";
import {
  getLanguages,
  getAllLanguages,
  getLanguageById,
  createLanguage,
  updateLanguage,
  deleteLanguage,
} from "../../controllers/v1/languages.controller";

const languagesRouter = new Hono();

languagesRouter.get("/", getLanguages);
languagesRouter.get("/all", getAllLanguages);
languagesRouter.get("/:id", getLanguageById);
languagesRouter.post("/", createLanguage);
languagesRouter.put("/:id", updateLanguage);
languagesRouter.delete("/:id", deleteLanguage);

export default languagesRouter; 