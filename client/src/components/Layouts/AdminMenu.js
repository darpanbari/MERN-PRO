import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center mx-auto ">
        <div className="list-group dashboard-menu shadow-lg" >
          <h4 className="d-flex align-items-center fs-5 justify-content-center font-fam" style={{height:"100px"}}>ADMIN DASHBOARD</h4>
          
          <NavLink
            to="/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/products"
            className="list-group-item list-group-item-action"
          >
            All Products
          </NavLink>
          <NavLink
            to="/admin/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          <NavLink
            to="/users"
            className="list-group-item list-group-item-action"
          >
            All Users
          </NavLink>
        
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
