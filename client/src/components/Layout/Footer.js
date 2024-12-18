import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <h5 className="text-center">Made with &#10084; by @ankitasingh</h5>
      <p className="text-center">
        <Link to="/about">About us</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/">Home</Link>
      </p>
    </div>
  );
};

export default Footer;
