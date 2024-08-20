import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    function navigateRegister(event) {
        navigate("/register");
    }
    function navigateLogin(event) {
        navigate("/login");
    }
    function logout(event) {
        Cookies.remove("name");
        navigateLogin(event);
    }

    return (
        <nav className="bg-gradient-dark navbar">
            <div className="row col text-white">
                <h3>Supermarket</h3>
            </div>
            <div className="row col text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                    <text x="20" y="10">
                        {Cookies.get("name")}
                    </text>
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                </svg>
            </div>
            {Cookies.get("name") == undefined ? (
                location.pathname == "/login" || location.pathname == "/register" ? (
                    <p></p>
                ) : (
                    <div style={{ paddingRight: 20 }}>
                        <button onClick={(e) => navigateLogin(e)} style={{ marginRight: 20 }} className="login" type="button">
                            Login
                        </button>
                        <button onClick={(e) => navigateRegister(e)} className="register" type="button">
                            Sign Up
                        </button>
                    </div>
                )
            ) : (
                <button style={{ marginRight: 20 }} onClick={(e) => logout(e)} className="logout" type="button">
                    Logout
                </button>
            )}
        </nav>
    );
}
export default Header;
