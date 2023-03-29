import React, { useEffect } from 'react';
import Home from './pages/Home';
import ProductList from "./pages/ProductList"
import ProductPage from "./pages/ProductPage"
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ThreeDots} from "react-loader-spinner";
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './pages/CheckoutForm';
import Complete from './pages/Completed';
import Completed from './pages/Completed';

const App = ()=> {
  var [mainFlag, setMainFlag] = React.useState(false);
  var [stripePromise, setStripePromise] = useState(null);
  var [clientSecret, setClientSecret] = useState("");
  var [charges, setCharges] = useState(5.2);
  var [discount, setDiscount] = useState(0);

  useEffect(()=>{
    fetch("http://localhost:4000/api/config-stripe")
    .then(res=>res.json())
    .then(y=>{
      const publishableKey = y;
      setStripePromise(loadStripe(publishableKey));
    });
  },[]);
  useEffect(()=>{
    var formData = new URLSearchParams();
    // formData.append();
    fetch("http://localhost:4000/api/create-payment-intent",{
      method: "post",
      body: formData,
    }).then(async (res)=>{
      const client_secret = await res.json();
      setClientSecret(client_secret);
    });
  },[]);

  return (
    <div className='App'>
      <Routes>
      {/* adding exact attribute will not let browser open up any other page on just '/' */}

        <Route exact path = '/' element={<Home mainFlag={mainFlag} setMainFlag={setMainFlag} ThreeDots={ThreeDots}/>}/> 
        <Route path = "/ProductPage/:id" element={<ProductPage mainFlag={mainFlag} setMainFlag={setMainFlag} ThreeDots={ThreeDots}/>}/>
        <Route path = "/ProductList" element={<ProductList mainFlag={mainFlag} setMainFlag={setMainFlag} ThreeDots={ThreeDots}/>}/>
        <Route path = "/Cart" element={
          <ProtectedRoute>
            <Cart mainFlag={mainFlag} setMainFlag={setMainFlag} charges={charges} discount={discount} ThreeDots={ThreeDots}/>
          </ProtectedRoute>
        }/>
        <Route path = "/Checkout" element={
          <ProtectedRoute>
            {
              stripePromise && clientSecret &&
              (<Elements stripe={stripePromise} options={{clientSecret}}>
                <CheckoutForm charges={charges} discount={discount}/>
              </Elements>)
            }
          </ProtectedRoute>
        }/>
        <Route path = "/Completed" element={
          <ProtectedRoute>
            <Completed/>
          </ProtectedRoute>
        }/>
        <Route path = "*" element={<div>Page Not Found</div>}/>
        
        <Route path = "/Login" element={<Login/>}/>
        <Route path = "/Register" element={<Register/>}/>
    </Routes>
    <ToastContainer
    theme='dark'
    hideProgressBar='true'
    position='bottom-right'
    autoClose='2000'
    />
    </div>
  )
}

const ProtectedRoute = ({
  redirectPath = '/login',
  children,
}) => {
  console.log("idhr e hai")
  let user = localStorage.getItem("user");
  if (user) {
    let u = JSON.parse(user);
    if(u?.accessToken) {
      console.log(u?.accessToken)
      return children;
    } else {
      console.log("accessToken not found")
      return <Navigate to={redirectPath} replace />;
    }
  } else {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default App;
