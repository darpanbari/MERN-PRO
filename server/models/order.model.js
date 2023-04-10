import mongoose from "mongoose";
import Product from "./product.model.js";
import User from "./user.model.js";

const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type:Schema.Types.ObjectId,
        ref:Product,
        require:true 
      },
    ],
    payment: {},
    buyer: {
      type:Schema.Types.ObjectId,
      ref:User,
      require:true 
    },
  },
);

export default mongoose.model("Order", orderSchema);
