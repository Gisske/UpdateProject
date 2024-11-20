import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/shop";
import ShopCategory from "./Pages/shopCategory";
import Product from "./Pages/Product";
import LoginSignup from "./Pages/LoginSignup";
import Cart from "./Pages/Cart";
import { Footer } from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/shirt.jpg";
import women_banner from "./Components/Assets/fashion3.webp";
import shop_banner from "./Components/Assets/shop.jpg";
import line_banner from "./Components/Assets/line.jpg";
import shoes_banner from "./Components/Assets/shoesbanner.jpg";


function App() {
    return ( <
        div >
        <
        BrowserRouter >
        <
        Navbar / >
        <
        Routes >
        <
        Route path = "/"
        element = { < LoginSignup / > }
        />{" "} <
        Route path = "/shop"
        element = { < Shop / > }
        />{" "} <
        Route path = "/mens"
        element = { < ShopCategory banner = { men_banner }
            category = "ผู้ชาย" / >
        }
        />{" "} <
        Route path = "/womens"
        element = { < ShopCategory banner = { women_banner }
            category = "ผู้หญิง" / >
        }
        />{" "} <
        Route path = "/shirt"
        element = { < ShopCategory banner = { shop_banner }
            category = "เสื้อช็อป" / >
        }
        />{" "} <
        Route path = "/ruls"
        element = { < ShopCategory banner = { line_banner }
            category = "เข้มขัด" / >
        }
        />{" "} <
        Route path = "/shose"
        element = { < ShopCategory banner = { shoes_banner }
            category = "รองเท้า" / >
        }
        />{" "} <
        Route path = "product"
        element = { < Product / > } >
        <
        Route path = ":productId"
        element = { < Product / > }
        />{" "} < /
        Route > { " " } <
        Route path = "/cart"
        element = { < Cart / > }
        />{" "}  < /
        Routes > { " " } <
        Footer / >
        <
        /BrowserRouter>{" "} < /
        div >
    );
}

export default App;