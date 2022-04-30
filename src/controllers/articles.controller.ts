import {
  Article,
  ArticlePOSTReq,
  ArticlePOSTRes,
} from "../types/articles.type";
import { Request, Response } from "express";
import moment from "moment";
import { ArticleStorage } from "../services/ArticleStorage";

const getArticle = (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const article: Article = ArticleStorage.getArticleById(id);

    return res.status(200).json(article);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const postArticle = (req: Request, res: Response) => {
  try {
    const newId = ArticleStorage.getSize().toString();
    const data: ArticlePOSTReq = req.body;
    const date: string = moment().format("YYYY-MM-DD");
    const newArticle: Article = {
      id: newId,
      date,
      ...data,
    };
    ArticleStorage.insertArticle(newId, newArticle);
    const retData: ArticlePOSTRes = {
      id: newId,
    };

    return res.status(200).json(retData);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export default { getArticle, postArticle };
