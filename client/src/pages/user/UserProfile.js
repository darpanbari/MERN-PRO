import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layouts/UserMenu";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";

const UserProfile = () => {
  //context
  const [auth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  return (
    <>
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-lg-2 col-md-7 justify-content-center dash-position">
            <UserMenu />
          </div>
          <div className="col-lg-10 col-md-6 my-5 w-50 dash margin" style={{marginLeft:"32%"}}>
            <div className="form-container" style={{ marginTop: "-40px" }}>
              <form >
                <h4 className="title text-center mt-5 fst-italic text-white bgcolor-2 py-4">USER PROFILE</h4>
                <div className="my-4 ">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control fs-4"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="my-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control fs-4 fs-4"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Email "
                    disabled
                  />
                </div>
                <div className="my-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control fs-4"
                    id="exampleInputPassword1"
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className="my-4">
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control fs-4"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Phone"
                  />
                </div>
                <div className="my-4">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control fs-4"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Address"
                  />
                </div>

                <Link><button to="/user-profile" className="btn btn-primary d-flex justify-content-center fw-bold mx-auto">
                  UPDATE
                </button></Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
