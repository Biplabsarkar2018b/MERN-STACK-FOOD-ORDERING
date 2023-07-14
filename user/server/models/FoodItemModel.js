import mongoose from "mongoose";

const FoodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  region:{
    type:String,
  },
  isCooked:{
    type:Boolean,
  },
  isVeg:{
    type:Boolean,
  }
});

const FoodUItemModel = mongoose.model("FoodItem", FoodItemSchema);
export default FoodUItemModel;
