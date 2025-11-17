import express from "express";
import {
  createFaq,
  getAllFaq,
  getFaq,
  updateFaq,
  deleteFaq,
} from "../controllers/categoryfaqcontroller.js";

const router = express.Router();

router.post("/add", createFaq);
router.get("/fetch", getAllFaq);
router.get("/:id", getFaq);
router.put("/edit/:id", updateFaq);
router.post("/delete", deleteFaq); // delete using body.id

export default router;
