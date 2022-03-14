import "./styles.css";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import Login from "./components/Authentication/Login";
import Registration from "./components/Authentication/Registration";
import UserList from "./components/UserList";
import OrderScreen from "./screens/OrderScreen";
import CartPage from "./components/CartPage/CartPage";
import NavbarNew from "./components/Navbar/NavbarNew";
import MyOrder from "./components/Order/MyOrder";
import AllProducts from "./components/AllProducts/AllProducts";
import SingleProductPage from "./components/AllProducts/SingleProductPage";
import Dashboard from "./components/AdminPage/Dashboard";

function App() {
  return (
    <Router>
      <NavbarNew />
      {/* <Navbar></Navbar> */}
      {/* <Header></Header> */}
      <main className="py-3">

        <Routes >
          <Route path='/' element={<HomeScreen />} exact />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/userlist' element={<UserList />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/product/:id' element={<SingleProductPage />} />
          <Route path='/shipping' element={<ShippingScreen />} />
          <Route path='/payment' element={<PaymentScreen />} />
          <Route path='/placeorder' element={<PlaceOrderScreen />} />
          <Route path='/myorders' element={<MyOrder />} />
          <Route path='/allproducts' element={<AllProducts />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/cart/:id/*' element={<CartPage />} />
          {/* <Route path='/cart' element={<CartScreen />} />
            <Route path='/cart/:id/*' element={<CartScreen />} /> */}
          <Route path='/order/:id/*' element={<OrderScreen />} />
        </Routes>


      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;