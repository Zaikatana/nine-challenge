import {
  Article,
  ArticleGETRes,
  ArticlePOSTReq,
  ArticlePOSTRes,
} from "../types/articles.type";
import { Request, Response } from "express";
import * as moment from "moment";
import { ArticleStorage } from "../services/ArticleStorage";
import { Errors } from "./helpers";

const getArticle = (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const article: ArticleGETRes = ArticleStorage.getArticleById(id);
    if (!article) {
      throw Errors.INVALID_ARTICLE_ID;
    }

    return res.status(200).json(article);
  } catch (error) {
    console.error(error);

    return res.status(400).json({ error });
  }
};

const postArticle = (req: Request, res: Response) => {
  try {
    const newId = (ArticleStorage.getSize() + 1).toString();
    // TODO: Check Request JSON
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
  } catch (error) {
    console.error(error);

    return res.status(400).json({ error });
  }
};

export default { getArticle, postArticle };
