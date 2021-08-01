import React,  { useState , useEffect , lazy , Suspense} from "react";
import {loginValidation} from "./Stor/Action/index";
import { ProtectedRoute } from "./ProtectedRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import loading from './c1bcd8a8c945b53da6b29f10a2a553c0.gif';
// import SignIn from './components/SignIn';
const SignIn = lazy(() => import('./components/SignIn'))
// import Dashboard from './components/Dashboard';
const Dashboard = lazy(() => import('./components/Dashboard'))
// import Home from "./components/Home";
// import ProdoctInfo from './components/ProdoctInfo';
const ProdoctInfo = lazy(() => import('./components/ProdoctInfo'))
// import Cart from "./components/Cart";
const Cart = lazy(() => import("./components/Cart"))
// import Category from './components/Category';
const Category = lazy(() => import('./components/Category'))

// import CartValidation from './components/CartValidation';
const CartValidation = lazy(() => import('./components/CartValidation'))

// import Pardakht from './components/Pardakht';
const Pardakht = lazy(() => import('./components/Pardakht'))

// import ResponseCach from './components/ResponseCach';
const ResponseCach = lazy(() => import("./components/ResponseCach"))

const Home = lazy(() => import("./components/Home"))
function App() {
  return (
    <Suspense fallback={<img src={loading} style={{"align":"center"}}/>}>
    <Router>
        <Switch>
          <Route path="/" exact>
            <Home>
            </Home>
          </Route>
          <Route path="/categories/:category">
            <Category/>
          </Route>
          <ProtectedRoute path="/dashboard" exact component={Dashboard} />
          <Route path="/setting">
          <SignIn/>
          </Route>
          <Route path="/cart" exact>
            <Cart/>
          </Route>
          <Route path="/endCart">
            <CartValidation/>
          </Route>
          <Route path="/cash">
            <Pardakht/>
          </Route>
          <Route path="/responseCach/:res">
            <ResponseCach/>
          </Route>
          <Route path="/:prodId">
            <ProdoctInfo/>
          </Route>

        </Switch>
      </Router>
      </Suspense>
  );
}

export default App;