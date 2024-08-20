import Searchbar from "../Searchbar/Searchbar";
import Topbar from "../Topbar/Topbar";
import Footer from '../Footer/Footer'
import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { CartContext } from "../CartContext";
import './Categories.css';
import { useNavigate } from "react-router-dom";
import '../Searchbar/Searchbar.css'
import UserSearchbar from "../UserSearchbar/UserSearchbar";

const Categories = () => {

    

   
    const navigate = useNavigate();
    


    const [productsData, setProductsData] = useState([]);
    const [fruitsData, setFruitsData] = useState([]);
    const [dairysData, setDairysData] = useState([]);

    const { addToCart } = useContext(CartContext);

  

    


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('./products.json');
                setProductsData(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('./fruits.json');
                setFruitsData(response.data);
            } catch (error) {
                console.error('Error fetching fruits:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('./dairys.json');
                setDairysData(response.data);
            } catch (error) {
                console.error('Error fetching dairy products:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="categories">

            <Topbar />
           

           <UserSearchbar/>


            <div className="category-container">
            <header  className="iteamheader">
                <div className="title">Fruits</div>
            </header>
            <div className="listProduct">
                {fruitsData.map(fruit => (
                    <div key={fruit.id} className="item">
                        <img className="product-images" src={process.env.PUBLIC_URL + fruit.image} alt={fruit.name}/>
                        <div className="product-name">{fruit.name}</div>
                        <div className="price">Rs. {fruit.price}</div>
                        <button className="addCart" onClick={() => addToCart(fruit)}>Add To Cart</button>
                    </div>
                ))}
            </div>

            <header className="iteamheader">
                <div className="title">Vegetables</div>
            </header>
            <div className="listProduct">
                {productsData.map(product => (
                    <div key={product.id} className="item">
                        <img className="product-images" src={process.env.PUBLIC_URL + product.image} alt={product.name}/>
                        <div className="product-name">{product.name}</div>
                        <div className="price">Rs. {product.price}</div>
                        <button className="addCart" onClick={() => addToCart(product)}>Add To Cart</button>
                    </div>
                ))}
            </div>

            <header  className="iteamheader">
                <div className="title">Dairy</div>
            </header>
            <div className="listProduct">
                {dairysData.map(dairy => (
                    <div key={dairy.id} className="item">
                        <img className="product-images" src={process.env.PUBLIC_URL + dairy.image} alt={dairy.name}/>
                        <div className="product-name">{dairy.name}</div>
                        <div className="price">Rs. {dairy.price}</div>
                        <button className="addCart" onClick={() => addToCart(dairy)}>Add To Cart</button>
                    </div>
                ))}
            </div>
        </div>
<Footer/>

        </div>
    )

}

export default Categories;