import Ajv from "ajv";
import { Request, Response, NextFunction } from "express";

export enum Errors {
  INVALID_ARTICLE_ID = "Invalid Article ID",
  INVALID_TAG = "Invalid Tag",
  INVALID_DATE = "Invalid Date",
  INVALID_PATH = "Invalid Path",
  ARTICLE_DATE_ERROR = "No Articles found for Date",
}

// Validates the schema of a Request body, Returns a 400 response if the request does not match schema
export const validateBody = (schema: any) => {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  return (req: Request, res: Response, next: NextFunction) => {
    if (!validate(req.body)) {
      const error = {
        error: validate.errors,
      };
      return res.status(400).json(error);
    }

    return next();
  };
};
