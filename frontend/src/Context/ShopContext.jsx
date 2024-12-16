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
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch all products
        fetch('http://localhost:4000/allproducts')
            .then((response) => response.json())
            .then((data) => setAll_Product(data));

        // Fetch cart items if user is authenticated
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
                .then((data) => setCartItems(data));
        }

        // Fetch user information if authenticated
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getuser', {
                method: 'GET',
                headers: {
                    'auth-token': `${localStorage.getItem('auth-token')}`, // Backticks ที่ถูกต้อง
                },
            })
                .then((response) => response.json())
                .then((data) => setUser(data))
                .catch((error) => console.error('Error fetching user:', error));
        }
    }, []);

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
                        .then((data) => setCartItems(data));
                });
        }
    }

    const removeToCart = (itemId, size) => {
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json', // แก้ Content-Type
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId, size }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to remove item from cart');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    return fetch('http://localhost:4000/getcart', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'auth-token': `${localStorage.getItem('auth-token')}`,
                            'Content-Type': 'application/json',
                        },
                        body: "",
                    });
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch updated cart');
                    }
                    return response.json();
                })
                .then((data) => setCartItems(data))
                .catch((error) => console.error('Error:', error)); // จัดการข้อผิดพลาดที่นี่
        }
    };


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

    const contextValue = {
        getTotalCartItem,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeToCart,
        user,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
