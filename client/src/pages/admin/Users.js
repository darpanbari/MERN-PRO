import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layouts/AdminMenu";
import axios from "axios";


const Users = () => {

  const [user, setUser] = useState();

  const getAllUser = async() => {
    try{
        const {data} = await axios.get("http://localhost:2020/user/get-user")
        setUser(data.data)
    }
    catch(error){
      console.log(error)
      alert("Someething Went Wrong");
    }
  }

  useEffect(()=>{
    getAllUser()
  },[])
  
  return (
    <>
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-lg-2 col-md-7 justify-content-center dash-position">
            <AdminMenu />
          </div>
          <div className="col-lg-10 col-md-6 shadow-lg my-5 dash w-50 margin" style={{marginLeft:"32%"}}>
            <h1 className="text-center mt-5 fst-italic text-white bgcolor-2 py-4">All Users</h1>
            <div className="w-100 px-0">
              <table className="table table-bordered my-5">
                <thead>
                  <tr>
                  <th scope="col">#</th>
                  <th scope="col">User ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {user?.map((u, i) => (
                    <>
                      <tr>
                        <td >{i++}</td>
                        <td>{u._id}</td>
                        <td>{u.name}</td>
                        <td>{u.phone}</td>
                        <td>{u.address}</td>

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
  );
};

export default Users;
