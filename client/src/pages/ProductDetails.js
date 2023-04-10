import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from './Redux/product/productActions';
import Button from 'react-bootstrap/Button';


const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [clicked, setClicked] = useState(false);

  // redux
  const cart = useSelector((state) => state.productState.cart);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
      dispatch(addToCart(product))
      setClicked(true);
      alert("Product Successfully Added In Cart!")
     
  }

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id))
 
  }

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:2020/product/get-product/${params._id}`
      );
      setProduct(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  

  return (
    <>
      <div
        className="row container product-details mx-auto shadow-lg p-5 "
      >
        <div className="col-md-6 d-flex my-auto">
          <img
            src={`http://localhost:2020/uploads/`+product.photo}
            className="card-img-top shadow"
            alt={product.name}
            height="450"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info py-5">
          <h1 className="text-center fst-italic bgcolor-2 text-white py-3 font-fam">Product Details</h1>
          <hr />
          <div className="px-3"> 
          <h6 className="fs-5 fw-bold">Name :  <span className="fst-italic fw-normal text-success">{product.name}</span></h6>
          <h6 className="fs-5 fw-bold">Description : <span className="fst-italic fw-normal text-success">{product.description}</span></h6>
          <h6 className="fs-5 fw-bold">Price : <span className="fst-italic fw-normal text-success">{`₹ ${product.price}`}</span></h6>
          <h6 className="fs-5 fw-bold">Category :  <span className="fst-italic fw-normal text-success">{product?.category?.name}</span></h6>
          </div>
          {/* <button
            className="w-100 py-1 fw-bold border-info bgcolor-2 text-light rounded-2"
            variant="success"
            onClick={() => handleAddToCart(product)}
          >
            Add to cart
          </button> */}
          {/* {cart.some(el => el._id === _id)            
                                ?       
                                <Button
                                    variant="danger"
                                    className='w-100'
                                    onClick={() => handleRemoveFromCart(_id)}
                                >
                                    Remove
                                </Button>
                                : */}
                                <Button
                                    className='w-100 mx-1'
                                    variant="success"
                                    onClick={() => handleAddToCart(product)}
                                    disabled={clicked}
                                >
                                    {clicked ? 'Cart added successfully !' : 'Add To Cart'}
                                </Button>
                           {/* }  */}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
