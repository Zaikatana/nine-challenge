import { Router } from "express";
import tagsController from "../controllers/tags.controller";

const router = Router();

router.get("/:tagName/:date", tagsController.getTags);

export default router;
