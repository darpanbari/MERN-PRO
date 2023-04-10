import React from "react";
import UserMenu from "../../components/Layouts/UserMenu";
import { useAuth } from "../../context/auth";

const UserDashboard = () => {
  const [auth] = useAuth();
  return(
    <>
      <div className="container-fluid p-3 dashboard"> 
        <div className="row">
          <div className="col-lg-2 col-md-7 justify-content-center">
            <UserMenu />
          </div>
          <div className="col-lg-10 col-md-6 shadow-lg my-5 mx-auto w-50 dash margin">
          <h1 className="text-center mt-5 fst-italic text-white bgcolor-2 py-4">Your Profile</h1>
            <div className="card p-3 border-0">
            <br/>
              <h3>Your Name:- {auth?.user?.name}</h3>
              <h3>Your Id:- {auth?.user?._id}</h3>
              <h3>Your Email:- {auth?.user?.email}</h3>
              <h3>Your Phone:- {auth?.user?.phone}</h3>
              <br/><br/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;



