import React, { useState, useEffect } from "react";
import AdminMenu from "./../../components/Layouts/AdminMenu";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:2020/product/get-product/${params._id}`
      );
      setName(data?.data?.name);
      setId(data?.data?.id);
      // setPhoto(data?.data?.photo)
      setDescription(data?.data?.description);
      setPrice(data?.data?.price);
      setQuantity(data?.data?.quantity);
      setCategory(data?.data?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);
  
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:2020/category/get-category");
      if (data?.success) {
        setCategories(data?.category1);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.patch(
        `http://localhost:2020/product/update-product/${params._id}`,
        productData
      );
      if (data?.success) {
        alert(data?.message);
      } else {
        alert("Product Updated Successfully");
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:2020/product/delete-product/${params._id}`
      );
      alert("Product Deleted Successfully");
      navigate("/products");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  return (
    <>
      <div className="container-fluid dashboard p-3">
        <div className="row">
          <div className="col-lg-2 col-md-7 justify-content-center dash-position">
            <AdminMenu />
          </div>
          <div className="col-lg-10 col-md-6 shadow-lg my-5 w-50 dash margin" style={{marginLeft:"32%"}}>
            <h1 className="text-center mt-5 fst-italic text-white bgcolor-2 py-4">Update Product</h1>
            <div className="m-5">
              <select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/product/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
