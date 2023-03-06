// import HomePage from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./app.css";
import { useEffect } from "react";
import store from "../src/store";
import { loadUser } from "../src/actions/userActions";
import { useSelector } from "react-redux";
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
import ProductPage from "./component/Admin/ProductAdmin/ProductPage";
import UpdateProduct from "./component/Admin/UpdateProduct";
import NewProduct from "./component/Admin/NewProduct";
import AdminPage from "./component/Admin/ProductAdmin/AdminPage";
import UserUpdate from "./component/Admin/UserUpdate";
import OrderAdmin from "./component/Admin/ProductAdmin/OrderAdmin";
import ProcessOrder from "./component/Admin/OrderDetails";
import ProductReviews from "./component/Admin/ProductReviews";
import Footer from "./component/layout/Footer/Footer.js";
// import NotFound from "./component/layout/Not Found/NotFound";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import Search from "./component/Product/Search";
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
  window.addEventListener("contextmenu", (e) => e.preventDefault());
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
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/about" component={About} />

      <Route exact path="/search" component={Search} />
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
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
      </Switch>
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/products/list"
        component={ProductPage}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/dashboard"
        component={Dashboard}
      />
      <ProtectedRoute
        exact
        path="/admin/product"
        isAdmin={true}
        component={NewProduct}
      />
      <ProtectedRoute
        exact
        path="/admin/product/:id"
        isAdmin={true}
        component={UpdateProduct}
      />
      <ProtectedRoute
        exact
        path="/admin/users"
        isAdmin={true}
        component={AdminPage}
      />
      <ProtectedRoute
        exact
        path="/admin/users/:id"
        isAdmin={true}
        component={UserUpdate}
      />
      <ProtectedRoute
        exact
        path="/admin/orders"
        isAdmin={true}
        component={OrderAdmin}
      />
      <ProtectedRoute
        exact
        path="/admin/order/:id"
        isAdmin={true}
        component={ProcessOrder}
      />
      <ProtectedRoute
        exact
        path="/admin/reviews"
        isAdmin={true}
        component={ProductReviews}
      />

      <Footer />
    </Router>
  );
};

export default App;
