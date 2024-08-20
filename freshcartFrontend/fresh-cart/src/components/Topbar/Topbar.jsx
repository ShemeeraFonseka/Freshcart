import './Topbar.css';

const Topbar = () => {


    return (
        <div className="topbar">
            <a style={{paddingRight:'10px',cursor:'pointer'}} >Home</a>
            <a >|</a>
            <a style={{paddingLeft:'10px',paddingRight:'80px',cursor:'pointer'}}>About Us</a>
            <a style={{paddingRight:'10px'}}>+94 11 2 768 454</a>
            <a >|</a>
            <a style={{paddingLeft:'10px'}}>hello@freshcart.com</a>
        </div>
    )

}
export default Topbar;