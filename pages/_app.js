import "../styles/globals.css"; // حسب بنية المجلدات
import '../styles/payment.css';

import React from "react";
import { Toaster } from "react-hot-toast";
// import {Google0AuthProvider} from '@react-oauth/google';
import Layaout from "../components/layout";
import {StateContext}  from '../context/StateContext';
export default function App({ Component, pageProps }) {


  return(
  <StateContext>
   
  <Layaout>
   <Toaster/>
  <Component {...pageProps} />
  </Layaout>
  </StateContext>
  )


}
