import React from "react";
import AdminMenu from "../../components/Layouts/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  console.log(auth)
  return(
    <>
      <div className="container-fluid p-3 dashboard"> 
        <div className="row">
          <div className="col-lg-2 col-md-7 justify-content-center dash-position">
            <AdminMenu />
          </div>
          <div className="col-lg-10 col-md-6 shadow-lg my-5 w-50 dash margin" style={{marginLeft:"32%"}}>
          <h1 className="text-center mt-5 fst-italic text-white bgcolor-2 py-4">Your Profile</h1>
            <div className="card w-75 p-3 border-0">
            <br/>
              <h3> Admin Name : {auth?.user?.name}</h3>
              <h3> Admin Email : {auth?.user?.email}</h3>
              <h3> Admin Contact : {auth?.user?.phone}</h3>
              <br/><br/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;


