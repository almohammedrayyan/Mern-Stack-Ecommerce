// import HomePage from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./app.css";
import { useEffect } from "react";
import store from "../src/store";
import { loadUser, updateProfile } from "../src/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
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
const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={LoginSignUp} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <ProtectedRoute path="/account" component={Profile} />
      <ProtectedRoute path="/me/update" component={UpdatedProfile} />
      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/cart" component={Cart} />

      {/* <Route exact path="/search" component={Search} /> */}
      <Route exact path="/password/reset/:token" component={ResetPassword} />
      <ProtectedRoute
        exact
        path="/password/update"
        component={UpdatePassword}
      />
      <Route exact path="/product/:id" component={ProductDetails} />
    </Router>
  );
};

export default App;
