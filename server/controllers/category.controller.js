import categoryModel from "../models/category.model.js";

// Create Category
export const createCategory = async (req, res) => {
  try {

    const {name} = req.body; //destructuring

    const data = new categoryModel({name:name}); //creating object
    const saveData = data.save(); //save data in db

    if(data){
        res.status(201).json({
            success: true,
            data:data,
            message:'Successfully data inserted!'
        }) 
    }

} catch (error) {
    res.status(400).json({
        success: false,
        message:error.message
    })
}
};

//update category
export const updateCategory = async (req,res) =>{
  try {
      const categoryID = req.params.category_id;
      const {name} = req.body;
      const updateCategory = await categoryModel.updateOne({_id:categoryID},{$set:{name:name}})
      if(updateCategory.acknowledged){
          res.status(200).json({
              message:'Update Successfully'
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

// get all cat
export const getCategory = async (req, res) => {
  try {
    const category1 = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category1,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// single category
export const singleCategory = async (req, res) => {
  try {
    // const category = await categoryModel.findOne({ slug: req.params.slug });
    const categoryID = req.params.category_id;
    const category = await categoryModel.findOne({_id:categoryID});
    res.status(200).send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

//delete category
export const deleteCategory = async (req,res) =>{
  try {
      const categoryID = req.params.category_id;

      const data = await categoryModel.deleteOne({_id:categoryID})
      if(data.acknowledged){
          res.status(200).json({
              message:'Deleted Successfully'
          })
      }
  }
  catch (error) {
      res.status(400).json({
          message:error.message
      })
 }
}
