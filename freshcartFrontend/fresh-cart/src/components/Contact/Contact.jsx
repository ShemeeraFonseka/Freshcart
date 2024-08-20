import React, { useContext, useRef, useState } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";
import { themeContext } from "../../Context";
const Contact = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const form = useRef();
  const [done, setDone] = useState(false)
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2mu5xtl",
        "template_m5udu2c",
        form.current,
        "VLwg1ltOWvnCYAiK_"
      )
      .then(
        (result) => {
          console.log(result.text);
          setDone(true);
          form.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="contact-form" id="contact">

      <div className="c-left">
        
          {/* darkMode */}
          <span className="fresh">Get in Touch with us</span>

        
                <div className="contect" style={{color: darkMode?'white': ''}}>
                <span>Email  : freshcart@gmail.com</span><div></div>
                <span>Mobile : +94770393894</span><div></div>
                <span>Address: b50/3 Kandy,headquarters</span><div></div>
                
                </div>
                
       
      </div>
     
    </div>
  );
};

export default Contact;
