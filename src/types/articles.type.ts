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

// Schema for POST /articles Request to use with ajv
export const articlePOSTReqSchema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 1 },
    body: { type: "string", minLength: 1 },
    tags: { type: "array", uniqueItems: true, minItems: 1 },
  },
  required: ["title", "body", "tags"],
  additionalProperties: false,
};

export type ArticlePOSTRes = {
  id: string;
};

export type ArticleGETReqParams = {
  id: string;
};

export type ArticleGETRes = Article;
