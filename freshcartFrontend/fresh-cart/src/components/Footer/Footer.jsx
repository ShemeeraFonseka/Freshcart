import React from "react";
import "./Footer.css";
import Wave from "../../img/wave.png";
import Insta from "@iconscout/react-unicons/icons/uil-instagram";
import Facebook from "@iconscout/react-unicons/icons/uil-facebook";
import Gitub from "@iconscout/react-unicons/icons/uil-github";
import Twitter from "@iconscout/react-unicons/icons/uil-twitter";

const Footer = () => {
  return (
    <div className="footer">

      <div className="f-content">
        <div className="footer-topic">FreshCart</div>
        <div className="footer-links">
          <p>Home</p>
          <p>Abouts Us</p>
          <p>Services</p>
          <p>Products</p>
          <p>Contact Us</p>
        </div>
        <div className="touch">Stay in Touch</div>
        <div className="f-icons">
          <Insta color="white" size={"2rem"} />
          <Facebook color="white" size={"2rem"} />
          <Twitter color="white" size={"2rem"} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
