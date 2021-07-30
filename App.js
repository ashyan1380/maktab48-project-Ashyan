import './App.css';
import React,  { useState , useEffect } from "react";
import SignIn from './components/SignIn';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from './components/Dashboard';
import {loginValidation} from "./Stor/Action/index";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "./components/Home";
import ProdoctInfo from './components/ProdoctInfo';
import Cart from "./components/Cart";
import Category from './components/Category';
import CartValidation from './components/CartValidation';
import Pardakht from './components/Pardakht';
import ResponseCach from './components/ResponseCach';

function App() {
  return (
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
  );
}

export default App;