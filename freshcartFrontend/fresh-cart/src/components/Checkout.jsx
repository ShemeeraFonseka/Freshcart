import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import emailjs from 'emailjs-com';
import "./Checkout.css";
import Topbar from './Topbar/Topbar';
import Searchbar from './Searchbar/Searchbar';
import UserSearchbar from './UserSearchbar/UserSearchbar';
import Footer from './Footer/Footer';

const Checkout = () => {
    const { cartItems ,clearCart} = useContext(CartContext);
    const navigate = useNavigate();
    const [deliveryDetails, setDeliveryDetails] = useState({
        name: '',
        address: '',
        city: '',
        phone: '',
        email: ''
    });
    const [errors, setErrors] = useState({});
    const [genericError, setGenericError] = useState('');

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeliveryDetails({
            ...deliveryDetails,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, address, city, phone, email } = deliveryDetails;
        let newErrors = {};

        if (!name) newErrors.name = "Name is required";
        if (!address) newErrors.address = "Address is required";
        if (!city) newErrors.city = "City is required";
        if (!phone) {
            newErrors.phone = "Phone number is required";
        } else if (!validatePhoneNumber(phone)) {
            newErrors.phone = "Phone number is invalid";
        }
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
            newErrors.email = "Email is invalid";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const templateParams = {
            name,
            address,
            city,
            phone,
            email,
            totalAmount,
            cartItems: cartItems.map(item => `${item.name} - ${item.quantity} x Rs. ${item.price}`).join(', ')
        };

        emailjs.send('service_vunoib8', 'template_50gkqyy', templateParams, 'soFQR3l3kCMKLYla3')
            .then((response) => {
                console.log('Email sent successfully!', response.status, response.text);
                alert('Email sent successfully!');
                clearCart();
                navigate('/categories');  
            })
            .catch((error) => {
                console.error('Failed to send email:', error);
                setGenericError('Failed to send email. Please try again later.');
            });
    };

    return (
        <div>
            <Topbar/>
            <UserSearchbar/>
        <div className="checkout-container">
            <div className="bill-details">
                <h1 className='bill-topic'>Bill Summary</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => (
                            <tr key={index} className="bill-item">
                                <td>
                                    <img src={process.env.PUBLIC_URL + item.image} alt={item.name} className="product-image" />
                                    &nbsp;&nbsp;{item.name}
                                </td>
                                <td>{item.quantity}</td>
                                <td>Rs. {item.price * item.quantity}.00</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="bill-total">
                    <span className='tot'>Total Amount: Rs. {totalAmount}.00</span>
                </div>
            </div>

            <div className='delivery-form'>
                <h2 className='bill-topic'>Delivery Details</h2>
                <form onSubmit={handleSubmit} className="delivery-form">
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={deliveryDetails.name}
                            onChange={handleInputChange}
                        />
                        {errors.name && <p style={{ color: "red", fontSize: "14px" }}>{errors.name}</p>}
                    </div>
                    <div className="form-group">
                        <label>Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={deliveryDetails.address}
                            onChange={handleInputChange}
                        />
                        {errors.address && <p style={{ color: "red", fontSize: "14px" }}>{errors.address}</p>}
                    </div>
                    <div className="form-group">
                        <label>City:</label>
                        <input
                            type="text"
                            name="city"
                            value={deliveryDetails.city}
                            onChange={handleInputChange}
                        />
                        {errors.city && <p style={{ color: "red", fontSize: "14px" }}>{errors.city}</p>}
                    </div>
                    <div className="form-group">
                        <label>Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={deliveryDetails.phone}
                            onChange={handleInputChange}
                        />
                        {errors.phone && <p style={{ color: "red", fontSize: "14px" }}>{errors.phone}</p>}
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={deliveryDetails.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <p style={{ color: "red", fontSize: "14px" }}>{errors.email}</p>}
                    </div>
                    <br></br>
                    {genericError && <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>{genericError}</p>}
                    <div className="button-container">
                        <button type="submit" className="check_btn">Place Order</button>
                    </div>
                </form>
            </div>
        </div>
        <Footer/>
        </div>
    );
};

export default Checkout;
