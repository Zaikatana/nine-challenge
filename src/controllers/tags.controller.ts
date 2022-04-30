import { Request, Response } from "express";
import moment from "moment";
import { ArticleStorage } from "../services/ArticleStorage";
import { TagGETRes } from "../types/tags.types";
import { Errors } from "../errors";

const getTags = (req: Request, res: Response) => {
  try {
    if (!moment(req.params.date, "YYYYMMDD", true).isValid()) {
      throw Errors.INVALID_DATE;
    }

    const tagName: string = req.params.tagName;
    const date: string = moment(req.params.date, "YYYYMMDD").format(
      "YYYY-MM-DD"
    );
    const tagInformation: TagGETRes = ArticleStorage.getTagByNameAndDate(
      tagName,
      date
    );

    return res.status(200).json(tagInformation);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export default { getTags };
