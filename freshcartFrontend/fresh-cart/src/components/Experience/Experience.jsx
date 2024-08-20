import React, { useContext } from "react";
import { themeContext } from "../../Context";
import "./Experience.css";
const Experience = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div className="experience" id='experience'>
      <div className="achievement">
        {/* darkMode */}
        <div className="circle" style={{color: darkMode?'var(--orange)':''}}>50+</div>
        
        <span style={{fontWeight:"bold"}}>Experience</span>
      </div>
      <div className="achievement">
        <div className="circle" style={{color: darkMode?'var(--orange)':''}}>500+</div>
        
        <span style={{fontWeight:"bold"}}>Foods</span>
      </div>
      <div className="achievement">
        <div className="circle" style={{color: darkMode?'var(--orange)':''}}>10+</div>
        
        <span style={{fontWeight:"bold"}}>Branches</span>
      </div>
    </div>
  );
};

export default Experience;
