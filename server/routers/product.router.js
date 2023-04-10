import express from 'express'
import { getProducts, addProduct,getProduct,deleteProduct,updateProduct, productCategory,productFilters 
    ,getOrders,getAllOrders,makeOrders, braintreeTokenController, brainTreePaymentController} from "../controllers/product.controller.js";

const router = express.Router();

router.get('/get-products',getProducts)

router.get('/get-product/:product_id',getProduct)

router.post('/add-product',addProduct)

router.delete('/delete-product/:product_id',deleteProduct)
// update
router.patch('/update-product/:product_id',updateProduct)

//category wise product
router.get("/product-category/:product_id", productCategory);

//filter product
router.post("/product-filters", productFilters);

//orders
router.get("/orders", getOrders);

//all orders
router.get("/all-orders", getAllOrders);

// make order
router.post("/make-orders", makeOrders)

// payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", brainTreePaymentController);


export default router;