import express, { Router } from "express";
import FoodUItemModel from "../models/FoodItemModel.js";

const router = Router();

router.get("/allFoods", async (req, res) => {
  try {
    const foods = await FoodUItemModel.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(404).json("Something is wrong!");
  }
});

router.get("/desiFoods", async (req, res) => {
  try {
    const foods = await FoodUItemModel.find({ region: "indian" });
    res.status(200).json(foods);
  } catch (error) {
    res.status(404).json("Something is wrong!");
  }
});

router.post("/addFood", async (req, res) => {
  try {
    const food = new FoodUItemModel(req.body);
    const newFood = await food.save();
    res.status(200).json(newFood);
  } catch (error) {
    res.status(404).json("Something is wrong, Could not add the food item");
  }
});


export default router;
