import '../Searchbar/Searchbar.css';
import { FiShoppingCart } from "react-icons/fi";
import { IoSearchSharp } from "react-icons/io5";
import '../ShopItems/ShopItems.css';
import { IoIosClose } from "react-icons/io";
import LoginModal from '../Login/LoginModal';
import RegisterModal from '../Register/RegisterModal'; // Import the RegisterModal
import { useContext, useState,useEffect } from "react";
import { CartContext } from "../CartContext";
import { useNavigate } from 'react-router-dom';

const UserSearchbar=()=>{

    const { cartItems, cartItemCount, increaseCart, decreaseCart } = useContext(CartContext);
    const [showCartTab, setShowCartTab] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // New state for RegisterModal

    const toggleCartTab = () => setShowCartTab(prev => !prev);
    const closeCartTab = () => setShowCartTab(false);

    const navigate = useNavigate();
    const handleCheckout = () => navigate('/checkout');

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    const openRegisterModal = () => setIsRegisterModalOpen(true); // Open RegisterModal
    const closeRegisterModal = () => setIsRegisterModalOpen(false); // Close RegisterModal


    const [productsData, setProductsData] = useState([]);
    const [fruitsData, setFruitsData] = useState([]);
    const [dairysData, setDairysData] = useState([]);

    const { addToCart } = useContext(CartContext);

    const [username, setUsername] = useState('');

    useEffect(() => {
        // Retrieve the username from sessionStorage after component mounts
        const storedUsername = sessionStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);


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


    return(
        <div className="search-section">
            <div className='brand-name'>
                FreshCart
            </div>
            <div className="search-bar">
                
                <input placeholder='Search here...' className='searchtext' type="text" />
                <IoSearchSharp className='search-icon' />
            </div>
            <div className='nav-text'>
                <a style={{ paddingRight: '40px', cursor: 'pointer' }} className='hide-text'>
                {username ? `Welcome, ${username}` : 'Welcome, Guest'}
                </a>

                <div style={{ position: 'relative', display: 'inline-block', paddingLeft: '10px', cursor: 'pointer' }}>
                    

                    <FiShoppingCart onClick={toggleCartTab} />
                    <span className="cart-badge">{cartItemCount}</span>
                </div>
                <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
                <RegisterModal onSuccessfulRegister={openLoginModal} isRegisterOpen={isRegisterModalOpen} onRegisterClose={closeRegisterModal} /> {/* Add RegisterModal here */}
            </div>

            {/* Cart Tab */}
            {showCartTab && (
                <div className="cartTab">
                    <div className='close-section'>
                        <IoIosClose className='close-icon' onClick={closeCartTab} />
                    </div>
                    <h1 className="tab-name">My Cart</h1>
                    <div className="listCart">
                        {cartItems.length > 0 ? (
                            cartItems.map((cartItem, index) => (
                                <div key={index} className="item">
                                    <div className="image">
                                        <img className="cart-image" src={process.env.PUBLIC_URL + cartItem.image} alt="" />
                                    </div>
                                    <div className="name" style={{ fontSize: "15px" }}>
                                        {cartItem.name}
                                    </div>
                                    <div className="totalPrice">
                                        <span style={{ fontSize: "15px" }}>Rs. {cartItem.price * cartItem.quantity}</span>
                                    </div>
                                    <div className="quantity">
                                        <span className="minus" style={{ fontSize: "20px" }} onClick={() => decreaseCart(cartItem)}>-</span>
                                        <span style={{ fontSize: "15px" }}>{cartItem.quantity}</span>
                                        <span className="plus" style={{ fontSize: "20px" }} onClick={() => increaseCart(cartItem)}>+</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-cart">Your cart is empty.</div>
                        )}
                    </div>
                    <div className="btn">
                        <button className="checkout" onClick={handleCheckout}>Check Out</button>
                    </div>
                </div>
            )}
        </div>
    )

}
export default UserSearchbar