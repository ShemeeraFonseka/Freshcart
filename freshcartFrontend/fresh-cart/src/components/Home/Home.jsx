import './Home.css'
import '../Navbar/Navbar.css'
import React, { useState } from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import LoginModal from '../Login/LoginModal';
import RegisterModal from "../Register/RegisterModal";
import Products from '../Products/Products';

const Home = () => {

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <div className="home">
      <div className="n-wrapper" id="Navbar">
        <div className="navbar">
          <div className="logo">
            <a className="freshcart">Fresh Cart</a>
          </div>

          <div className="nav-links">
            <ul className="links">
              <li><Link className="nav-a" to="products" spy={true} smooth={true}>Products</Link></li>
              <li><Link className="nav-a" to="offers" spy={true} smooth={true}>Offers</Link></li>
              <li><Link className="nav-a" to="contact" spy={true} smooth={true}>Contact</Link></li>
            </ul>
            <a onClick={openLoginModal} className="login-a">Login</a>
            <a onClick={openRegisterModal} className="login-a">Register</a>
          </div>
        </div>
        <LoginModal isOpen={isModalOpen} onClose={closeModal} />
        <RegisterModal isRegisterOpen={isRegisterModalOpen} onRegisterClose={closeRegisterModal} onSuccessfulRegister={openLoginModal} />
      </div>
      <div className="home-container">
        <div className="text-container">
          <span className="headline">Eat Fresh, <br></br>Live Healthy</span><br></br><br></br>
          <button className='shop-button'>Shop Now</button>
        </div>
      </div>

      <Products/>
    </div>
  );
}

export default Home;
