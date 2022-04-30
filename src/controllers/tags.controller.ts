import { Request, Response } from "express";
import * as moment from "moment";
import { ArticleStorage } from "../services/ArticleStorage";
import { TagGETRes } from "../types/tags.types";
import { Errors } from "./helpers";

const getTags = (req: Request, res: Response) => {
  try {
    // TODO: Check Params
    const tagName: string = req.params.tagName;
    const date: string = moment(req.params.date, "YYYYMMDD").format(
      "YYYY-MM-DD"
    );

    const tagInformation: TagGETRes = ArticleStorage.getTagByNameAndDate(
      tagName,
      date
    );
    if (!tagInformation) {
      throw Errors.INVALID_TAG;
    }

    return res.status(200).json(tagInformation);
  } catch (error) {
    console.error(error);

    return res.status(400).json({ error });
  }
};

export default { getTags };
