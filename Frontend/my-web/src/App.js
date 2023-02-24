// import HomePage from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./app.css";
import { useEffect } from "react";
import store from "../src/store";
import { loadUser, updateProfile } from "../src/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import WebFont from "webfontloader";
import Home from "./component/Home/Home";
import ForgotPassword from "./component/User/ForgotPasword";
import Header from "./component/layout/Header/Header";
import Products from "./component/Product/Products";
import ProductDetails from "./component/Product/ProductDetails";
import LoginSignUp from "./component/User/LoginSignUp";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoutes";
import UpdatedProfile from "./component/User/UpdatedProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import { useState } from "react";
import axios from "axios";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeAPiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeAPiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={LoginSignUp} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <ProtectedRoute path="/account" component={Profile} />
      <ProtectedRoute path="/me/update" component={UpdatedProfile} />
      <ProtectedRoute path="/shipping" component={Shipping} />

      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/cart" component={Cart} />

      {/* <Route exact path="/search" component={Search} /> */}
      <Route exact path="/password/reset/:token" component={ResetPassword} />
      <ProtectedRoute
        exact
        path="/password/update"
        component={UpdatePassword}
      />
      <ProtectedRoute exact path="/success" component={OrderSuccess} />
      <ProtectedRoute exact path="/orders" component={MyOrders} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Switch>
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
      </Switch>
      <ProtectedRoute exact path="/admin/dashboard" component={Dashboard} />
    </Router>
  );
};

export default App;
