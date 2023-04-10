import Product from '../models/product.model.js'
import Category from '../models/category.model.js'
import Order from "../models/order.model.js"
import multer from 'multer'
import fs from 'fs'
import braintree from "braintree";

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "v8t2w8f56cktvkhm",
  publicKey: "g7gcx2q48xy5xnfr",
  privateKey: "afeec896de6807e600c11f71248319d8",
});

const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const randomDate = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + randomDate+'.png')
    }
  })

const upload = multer({ storage: storage1 })

export const getProducts = async (req,res) =>{

    try {
        const {sort,q} = req.query;

        let sortvalue = 1;
        if(sort == 'htl'){
            sortvalue = -1;
        }
        let data = [];
        if(q){
             data = await Product.find(
                { 
                $or:[{"name": { $regex: '.*' + q + '.*', $options: 'i' }},
                {"description": { $regex: '.*' + q + '.*', $options: 'i'}}]},
                ).populate('category').sort({price:sortvalue});
        }else{
             data = await Product.find().populate('category').sort({price:sortvalue});
        }
 
         res.status(200).json({
             success: true,
             data:data,
             message:'Successfully fetched!',
             path:'http://localhost:2020/uploads/'

         })
    } catch (error) {
         res.status(400).json({
            success:false,
            message:error.message,
         })
    }
 }

 
export const addProduct =(req,res)=>{
    try {
        console.log(req.body)
        const imageStore =  upload.single('photo');
        imageStore(req,res, async function(err){
            if(err){
                res.status(400).json({
                    message:err.message
                })
            }
            console.log()

            const {name,category,price,quantity,description} = req.body; //destructuring

            const prodData = new Product({
                name: name,
                category: category,
                price: price,
                quantity: quantity,
                description: description,
                photo: req?.file?.filename,
            });
            const saveData = prodData.save(); 

            if(prodData){
                res.status(201).json({
                    success:true,
                    data:prodData,
                    message:'Successfully data inserted!',
                    path:'http://localhost:2020/uploads/',
                    
                }) 
            }

            })
       
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}


export const getProduct = async (req,res) =>{
    try {
        const productID = req.params.product_id;
        const data = await Product.findOne({_id:productID}).populate('category'); 
        if(data){
            res.status(200).json({
                success:true,
                data:data,
                message:'Single Category data!',
                path:'http://localhost:2020/uploads/'
            })
        }
   } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
   }
}

export const deleteProduct = async (req,res) =>{
    try {
        const productID = req.params.product_id;
        const proData = await Product.findOne({_id:productID});
        const data = await Product.deleteOne({_id:productID})

        if(data.acknowledged){
            fs.unlinkSync('./uploads/'+proData.photo)
            res.status(200).json({
                success:true,
                message:'Deleted Successfully'
            })
        }
    }
    catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
   }
}

export const updateProduct = async (req,res) =>{

    try {
        
        const imageStore =  upload.single('photo');
        imageStore(req,res, async function(err){
            if(err){
                res.status(400).json({
                    message:err.message
                })
            }

            const productID = req.params.product_id;
            const {name,category,price,quantity,description} = req.body; 
            const proData = await Product.findOne({_id:productID});
            let img = ''
            if(req?.file?.filename){
                img = req.file.filename
                fs.unlinkSync('./uploads/'+proData.photo)
            }else{
                img = proData.photo;
            }
            const updateProduct = await Product.updateOne({_id:productID},{$set:
                {
                    name:name,
                    category:category,
                    price:price,
                    quantity:quantity,
                    description:description,
                    photo:img,
                }})
         
            if(updateProduct.acknowledged){
                res.status(200).json({
                    success:true,
                    message:'updated data inserted!',
                }) 
            }
            })
       
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    } 
}

// get prdocyst by catgory
export const productCategory = async (req, res) => {
    try {
      const category = await Category.findOne({ _id: req.params.product_id });
      const products = await Product.find({ category }).populate("category");
      res.status(200).send({
        success: true,
        category,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        error,
        message: "Error While Getting products",
      });
    }
  };

  // filters
export const productFilters = async (req, res) => {
    try {
      const { checked } = req.body;
      let query = {};
      if (checked.length > 0) query.category = checked;
      const products = await Product.find(query);
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "Error While Filtering Products",
        error,
      });
    }
  };

  //orders
export const getOrders = async (req, res) => {
    try {
      const order = await Order.find({})
     
      res.status(200).send({
        success: true,
        message: "getting order successfull",
        order,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  //orders
  export const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find({}).populate("products").populate("buyer")
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Getting Orders",
        error,
      });
    }
  };
  
  export const makeOrders = async (req, res)=>{
    try{
        const {order} =  req.body;
   
        const data = new Order({products:order, buyer:req.body._id})
  
        const saveData = data.save();
  
        if(data){
          res.status(201).json({
            success:true,
            data: data,
            message: "Order Successfull"
          })
  
        }
    }
    catch(error){
        res.status(400).json({
          success:false,
          error: error,
          message: "Order not placed"
        })
    }
  }
  

  //payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new Order({
            products: cart,
            payment: result,
            buyer: req?.user?._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
