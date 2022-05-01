import { Tag } from "./tags.types";

export type Article = {
  id: string;
  title: string;
  date: string;
  body: string;
  tags: Tag[];
};

// POST /articles request body
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
    tags: {
      type: "array",
      uniqueItems: true,
      minItems: 1,
      items: { type: "string", minLength: 1 },
    },
  },
  required: ["title", "body", "tags"],
  additionalProperties: false,
};

// POST /articles response body
export type ArticlePOSTRes = {
  id: string;
};

// GET /articles request parameters
export type ArticleGETReqParams = {
  id: string;
};

// GET /articles response body
export type ArticleGETRes = Article;
