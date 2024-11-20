import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from './Pages/LoginSignUp/LoginSignUp';


function App = () => {
    return ( <
        div >
        <
        BrowserRouter >
        <
        Routes >
        <
        Route path = "/login"
        element = { < LoginSignup / > }
        />{" "} < /
        Routes > <
        /BrowserRouter> < /
        div >
    )
}

export default App