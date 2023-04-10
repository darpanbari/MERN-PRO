import React, { useState, useEffect } from 'react'
import AdminMenu from "./../../components/Layouts/AdminMenu";
import axios from "axios";
import { MdDelete } from 'react-icons/md';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState([])

  // add category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("http://localhost:2020/category/create-category",{
        name
    });
      if (data?.success) {
        alert(`${name} is created`);
        setName("")
        getAllCategory()
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("somthing went wrong in input form");
    }
  };


  const getAllCategory = () => {
    axios.get("http://localhost:2020/category/get-category")
      .then((res) => {
        console.log(res);
        setCategories(res?.data?.category1);
      }).catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:2020/category/delete-category/${id}`
      );
      if (data) {
        // alert("Category Successfully DELETED !");
        getAllCategory();
      } else {
        alert(data?.message);
      }
    } catch (error) {
      alert("Somtihing went wrong");
    }
  };

  return (
    <>
      <div className="container-fluid p-3 dashboard ">
        <div className="row">
          <div className="col-lg-2 col-md-7 justify-content-center dash-position" >
            <AdminMenu />
          </div>
          <div className="col-lg-10 col-md-6 shadow-lg my-5 w-50 dash margin" style={{marginLeft:"32%"}}>
            <h1 className="text-center mt-5 fst-italic text-white bgcolor-2 py-4">Manage Category</h1>

            <form className='p-4 mx-auto w-50' onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter new category"
                  name='name'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <button type="submit" className="btn bgcolor-2 text-light d-flex mx-auto w-50 justify-content-center">
                Submit
              </button>
            </form>

            <div className="w-100 px-5 mx-auto pb-5 ">
              <table className="table shadow-sm">
                <thead>
                  <tr className=" shadow-sm">
                    <th scope="col">Name</th>
                    <th className='d-flex justify-content-center mx-auto' scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr className='shadow-sm'>
                        <td key={c._id} >{c.name.toUpperCase()}</td>
                        <td>
                          
                        <MdDelete className=" text-danger fs-3 d-flex mx-auto" onClick={() => handleDelete(c._id)} />
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateCategory;