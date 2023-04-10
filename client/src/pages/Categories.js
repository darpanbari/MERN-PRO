import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Categories = () => {

    const [categories, setCategories] = useState([])

    const getAllCategory = async()=>{
        try{
            const {data} = await axios.get("http://localhost:2020/category/get-category")
            setCategories(data?.category1)
            console.log(data?.category1)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getAllCategory()
    },[])


  return (
    <>
      <div className="container" style={{ marginTop: "100px", marginBottom:"200px"}}>
        <div className="row container">
          {categories.map((c) => (
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <div className="card">
                <Link to={`/category/${c._id}`} className="btn cat-btn">
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;