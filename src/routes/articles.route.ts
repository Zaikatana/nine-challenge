import { Router } from "express";
import articlesController from "../controllers/articles.controller";

const router = Router();

router.get("/:id", articlesController.getArticle);

router.post("/", articlesController.postArticle);

export default router;
