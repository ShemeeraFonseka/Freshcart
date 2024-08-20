import './App.css'
import { Routes, Route } from 'react-router-dom';
import ShopItems from "./components/ShopItems/ShopItems";
import Checkout from "./components/Checkout";
import { CartProvider } from "./components/CartContext";
import ImageCarousel from './components/Carousel/ImageCarousel';
import Topbar from './components/Topbar/Topbar';
import Searchbar from './components/Searchbar/Searchbar';
import React, { useRef } from 'react';
import Categories from './components/Categories/Categories';
import Footer from './components/Footer/Footer';

function App() {


  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={
          <>
            <Topbar />
            <Searchbar/>
            <ImageCarousel />
            <ShopItems />
            <Footer/>
          </>
        } />

        <Route path="/checkout" element={<Checkout />} />


        <Route path="/categories" element={<Categories />} />

      </Routes>
    </CartProvider>
  );
}

export default App;
