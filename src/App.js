import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
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
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Authentication/Login";
import Registration from "./components/Authentication/Registration";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      {/* <Header></Header> */}
      <main className="py-3">
        <Container>
          <Routes >
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/cart/:id/*' element={<CartScreen />} />
          </Routes>

        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;
