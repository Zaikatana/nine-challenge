import { Router } from "express";
import tagsController from "../controllers/tags.controller";
import { TagGETReqParams, TagGETRes } from "../types/tags.types";

const router = Router();

router.get<TagGETReqParams, TagGETRes>("/:tagName/:date", tagsController.getTags);

export default router;
