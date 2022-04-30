import { Router } from "express";
import articlesController from "../controllers/articles.controller";
import { ArticleGETReqParams, ArticleGETRes, ArticlePOSTRes } from "../types/articles.type";

const router = Router();

router.get<ArticleGETReqParams, ArticleGETRes>("/:id", articlesController.getArticle);

router.post<{}, ArticlePOSTRes>("/", articlesController.postArticle);

export default router;
