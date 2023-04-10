import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { Checkbox } from "antd";
import axios from "axios";
import "../styles/Homepage.css";
//add/remove to cart
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "./Redux/product/productActions";
import { GridLoader } from 'react-spinners';
//pagination
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");

  // const [pagination, setPagination] = useState("")

  // redux
  const cart = useSelector((state) => state.productState.cart);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:2020/product/get-products`
      );
      setLoading(false);
      setProducts(data.data);
      console.log(data.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:2020/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCategory();
  }, []);

  // search filter
  const filteredProducts = products.filter(
    (p) =>
      p.price.toString().includes(query) ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  console.log(filteredProducts);

  useEffect(() => {
    if (checked.length) filterProduct();
  }, [checked]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:2020/product/product-filters",
        {
          checked,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //Pagination
  // const handlePagination =(e)=>{
  //     setPagination(e.target.value)
  //     console.log(e.target.value)
  //     console.log(pagination)
  // }

  return (
    <>
      {/* banner image */}
      <Carousel className="banners">
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            style={{ height: "70vh" }}
            src="/images/banner.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h1>Welcome to About Baby Shop !</h1>
            <p>|| STYLE YOUR LITTLE ONES ||</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            style={{ height: "70vh" }}
            src="/images/banner2.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h1>Baby Essentials !</h1>
            <p>T-shirts | Patnts | Inner-Wear | Shoes</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ height: "70vh" }}
            src="/images/banner3.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h1>Flat 50% Off is hear !</h1>
            <p>Summer OFFER | By one get one FREE</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      ){/* banner image */}
      {loading &&
                <div className='loader-container d-flex justify-content-center'>
                    <GridLoader loading={loading} color="#42c569" />
                </div>
            }
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-2 filters">
          <h4 className="text-center font-fam text-white fst-italic bgcolor-2 p-2">
            Filter By Category
          </h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name.toUpperCase()}
              </Checkbox>
            ))}
          </div>

          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>

       
        <div className="col-md-10">
          <h1 className="text-center text-success mt-5">ALL PRODUCTS</h1>

          {/* Search  */}

          <div className="customSearchBar mb-0 m-4 d-flex justify-content-center">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              style={{
                height: "40px",
                width: "400px",
                outline: "none",
                marginBottom: "30px",
              }}
              type="search"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              placeholder=" Search Product With Name/Description"
              spellCheck={false}
            />
          </div>
          

          {/* All Products */}

          <div className="d-flex flex-wrap justify-content-center">
            {!filteredProducts?.length ? (
              <h4 className="mt-5">
                No products were found matching your search !
              </h4>
              
            ) : (
              
              filteredProducts?.map((p) => {
                const { id } = p;
                return (
                  <div className="card m-2 rounded-0" key={p._id}>
                    <img
                      src={`http://localhost:2020/uploads/` + p.photo}
                      className="card-img-top rounded-0"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <div className="card-name-price">
                        <h5 className="card-title">{p.name}</h5>
                        <h5 className="card-title card-price">
                          <h5 className="card-title card-price bg-warning text-black py-1 px-4">
                            {`₹ ${p.price}`}
                          </h5>
                        </h5>
                      </div>
                      <p className="card-text text-truncate text-success my-2">
                        {p.description}
                      </p>
                      <div className="card-name-price my-4">
                        <button
                          className="btn bgcolor-2 ms-1 me-1 "
                          onClick={() =>
                            navigate(`/product/get-product/${p._id}`)
                          }
                        >
                          More Details
                        </button>
                        {cart.some((el) => el.id === id) ? (
                          <Button
                            variant="danger"
                            className="w-100"
                            onClick={() => handleRemoveFromCart(id)}
                          >
                            Remove
                          </Button>
                        ) : (
                          <Button
                            className="w-100"
                            variant="success"
                            onClick={() => handleAddToCart(p)}
                          >
                            Add to cart
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
           
          </div>
        </div>
      </div>
      {/* <Stack spacing={2}>
      <Pagination count={10} color="primary" value="" onClick={handlePagination}/>
    </Stack> */}
    </>
  );
};

export default Home;
