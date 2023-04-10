import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux';

const Header = () => {
  const [auth, setAuth] = useAuth();

  const cartCount = useSelector((state) => state.productState.cart.length)

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    alert("Logout Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary position-sticky top-0 w-100 z-3 shadow">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse " id="navbarTogglerDemo01">
            <Link className="navbar-brand">
                <img src="images/logo.png" style={{height: "45px", width: "200px"}} alt="BaBy ShOp"></img>
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link ">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category" className="nav-link" href="#">
                  Category
                </NavLink>
              </li>

{/* Register & login start*/}
              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/${
                            auth?.user?.role === 1 ? "admin-dashboard" : "user-dashboard"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
{/* Register & login end*/}

              <li className="nav-item">
                <NavLink to="/contact" className="nav-link ">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
              <NavLink
                        to={'/Cart'}
                        className="nav-link cartIconContainer"
                    >
                        {/* <div className='cartIconContainer'> */}
                            <Badge bg="danger">
                                {cartCount}
                            </Badge>
                            Cart
                            {/* <i className="fa-solid fa-cart-shopping" /> */}
                        {/* </div> */}
                </NavLink>
                </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
