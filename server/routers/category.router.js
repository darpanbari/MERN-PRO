import express from "express";
import {getCategory,createCategory,deleteCategory,singleCategory,updateCategory,} from "./../controllers/category.controller.js";

const router = express.Router();

//routes
// create category
router.post("/create-category",createCategory);

//update category
router.put("/update-category/:category_id",updateCategory);

//getALl category
router.get("/get-category", getCategory);

//single category
router.get("/single-category/:category_id", singleCategory);

//delete category
router.delete("/delete-category/:category_id",deleteCategory);

export default router;
