import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Pagenotfound from "./pages/Pagenotfound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import UserProfile from "./pages/user/UserProfile";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Products from "./pages/admin/Products";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import Cart from "./pages/Cart";
import UserOrders from "./pages/user/UserOrders";
import UpdateProduct from "./pages/admin/UpdateProduct";
import AdminOrders from "./pages/admin/AdminOrders";
import Users from "./pages/admin/Users";

function App() {
  return (

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="*" element={<Pagenotfound/>}/>

        <Route path="/user-dashboard" element={<UserDashboard/>}/>
        <Route path="/user-profile" element={<UserProfile/>}/>
        <Route path="/user/orders" element={<UserOrders/>}/>


        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path="/create-category" element={<CreateCategory/>}/>
        <Route path="/create-product" element={<CreateProduct/>}/>
        <Route path="/update-product/:_id" element={<UpdateProduct/>}/>
        <Route path="/category" element={<Categories/>}/>       
        <Route path="/products" element={<Products />}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/admin/orders" element={<AdminOrders/>}/>

        <Route path="/category/:_id" element={<CategoryProduct />} />
        <Route path="/product/get-product/:_id" element={<ProductDetails />} />
      </Routes>

  );
}

export default App;
