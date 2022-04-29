import { Tag } from "./tags.types";

export type Article = {
  id: string;
  title: string;
  date: string;
  body: string;
  tags: Tag[];
};

export type ArticlePOSTReq = {
  title: string;
  body: string;
  tags: Tag[];
};

export type ArticlePOSTRes = {
  success: boolean;
  id: string;
};

export type ArticleGETRes = Article;
