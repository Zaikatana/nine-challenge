import {
  Article,
  ArticleGETRes,
  ArticlePOSTReq,
  ArticlePOSTRes,
} from "../types/articles.type";
import { NextFunction, Request, Response } from "express";
import * as moment from "moment";
import { ArticleStorage } from "../ArticleStorage";

const getArticle = (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  const article: ArticleGETRes = ArticleStorage.getArticleById(id);
  if (!article) {
    // failure response
    return res.status(400).json({
      error: "Invalid Article ID",
    });
  }
  
  return res.status(200).json(article);
};

const postArticle = (req: Request, res: Response, next: NextFunction) => {
  const newId = (ArticleStorage.getSize() + 1).toString();
  const data: ArticlePOSTReq = req.body;
  const date: string = moment().format("YYYY-MM-DD");
  const newArticle: Article = {
    id: newId,
    date,
    ...data,
  };
  ArticleStorage.insertArticle(newId, newArticle);
  const retData: ArticlePOSTRes = {
    success: true,
    id: newId,
  };

  return res.status(200).json(retData);
};

export default { getArticle, postArticle };
