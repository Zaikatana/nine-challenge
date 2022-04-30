import { Router } from "express";
import articlesController from "../controllers/articles.controller";
import { validateBody } from "../errors";
import {
  ArticleGETReqParams,
  ArticleGETRes,
  articlePOSTReqSchema,
  ArticlePOSTRes,
} from "../types/articles.type";

const router = Router();

router.get<ArticleGETReqParams, ArticleGETRes>(
  "/:id",
  articlesController.getArticle
);

router.post<{}, ArticlePOSTRes>(
  "/",
  validateBody(articlePOSTReqSchema),
  articlesController.postArticle
);

export default router;
