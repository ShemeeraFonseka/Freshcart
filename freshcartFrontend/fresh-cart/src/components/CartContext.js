import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);

    const addToCart = (item) => {
        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity += 1;
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
            setCartItemCount(cartItemCount + 1);
        }
    };

    const increaseCart = (item) => {
        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity += 1;
            setCartItems(updatedCartItems);
        }
    };

    const decreaseCart = (item) => {
        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity -= 1;

            if (updatedCartItems[existingItemIndex].quantity === 0) {
                updatedCartItems.splice(existingItemIndex, 1);
                setCartItemCount(cartItemCount - 1);
            }

            const updatedCartTabItems = updatedCartItems.filter(cartItem => cartItem.quantity > 0);
            setCartItems(updatedCartTabItems);
        }
    };

    const clearCart = () => {
        setCartItems([]);
        setCartItemCount(0);
    };

    return (
        <CartContext.Provider value={{ cartItems, cartItemCount, addToCart, increaseCart, decreaseCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
