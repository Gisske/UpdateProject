import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}
const ShopContextProvider = (props) => {

    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((response) => response.json())
            .then((data) => setAll_Product(data))

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: "",
            }).then((response) => response.json())
                .then((data) => setCartItems(data))
        }
    }, [])


    const addToCart = (itemId, size, price) => {

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId, "size": size, "price": price }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data)).finally(() => {
                    fetch('http://localhost:4000/getcart', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/form-data',
                            'auth-token': `${localStorage.getItem('auth-token')}`,
                            'Content-Type': 'application/json',
                        },
                        body: "",
                    }).then((response) => response.json())
                        .then((data) => setCartItems(data))
                })
        }
    }

    const removeToCart = (itemId, size) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId, "size": size }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data)).finally(() => {
                    fetch('http://localhost:4000/getcart', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/form-data',
                            'auth-token': `${localStorage.getItem('auth-token')}`,
                            'Content-Type': 'application/json',
                        },
                        body: "",
                    }).then((response) => response.json())
                        .then((data) => setCartItems(data))
                })
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        if (cartItems.length > 0) {
            totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        }
        return totalAmount;
    }

    const getTotalCartItem = () => {
        let totalItem = 0;
        if (cartItems.length > 0) {
            totalItem = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        }
        return totalItem;
    }



    const contextValue = { getTotalCartItem, getTotalCartAmount, all_product, cartItems, addToCart, removeToCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;