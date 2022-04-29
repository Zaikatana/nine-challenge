import { NextFunction, Request, Response } from "express";
import * as moment from "moment";
import { ArticleStorage } from "../ArticleStorage";
import { TagGETRes } from "../types/tags.types";

const getTags = (req: Request, res: Response, next: NextFunction) => {
  const tagName: string = req.params.tagName;
  const date: string = moment(req.params.date, "YYYYMMDD").format("YYYY-MM-DD");

  const tagInformation: TagGETRes = ArticleStorage.getTagByNameAndDate(tagName, date);

  return res.status(200).json(tagInformation);
};

export default { getTags };
