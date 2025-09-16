import express from "express";
import multer from "multer";
import {
  createItem,
  deleteItem,
  getAllItems,
  getItemById,
  getMyItems,
  updateItem,
} from "../controllers/itemController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/newItem", verifyToken, upload.array("img", 5), createItem);
router.get("/", getAllItems);
router.get("/myItems", verifyToken, getMyItems);

router.put("/update/:id", verifyToken, updateItem);
router.delete("/delete/:id", verifyToken, deleteItem);
router.get("/:id", getItemById);

export default router;
