import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import axios from "axios";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?._id) getPrductsByCat();
  }, [params?._id]);

  const getPrductsByCat = async () => {
    try {
      const {data} = await axios.get(
        `http://localhost:2020/product/product-category/${params._id}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
      // console.log(data?.products)
      // console.log(data?.category)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center mb-5 color-1">{products?.length} result found </h6>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="d-flex flex-wrap justify-content-center ">
              {products?.map((p) => (
                <div className="card m-2 rounded-0 mx-4"  key={p._id}>
                  <img
                    // src={`/product/${p._id}`}
                    src={`/images/banner.jpg`}
                    className="card-img-top rounded-0"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price bg-warning text-black py-1 px-4">
                       {`₹ ${p.price}`}
                      </h5>
                    </div>
                    <p className="card-text text-truncate text-success my-2">
                      {p.description}
                    </p>
                    <div className="card-name-price my-4">
                      <button
                        className="btn btn-info bgcolor-2 ms-1 btn-hover"
                        onClick={() => navigate(`/product/get-product/${p._id}`)}
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryProduct;
