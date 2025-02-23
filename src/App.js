import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import SriLankaMap from "./SriLankaMap";
import logo from './img/logo.png';
import playstoreLogo from './img/gstore.png';
import appstoreLogo from './img/appstore.png';
import Footer from "./footer";
import Header from "./header";
import Products from "./products";
import ChargingStationInquiryForm from "./chargingstationinquire";
import AboutUs from "./About-us";
import AlignItemsList from "./feedback";
import SignIn from "./SignIn";

function App() {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollingDown(true);
      } else {
        setScrollingDown(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFeedbackVisible(true);
    }, 500); // Delay before showing the feedback text
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  const handleProductsClick = () => {
    console.log("Products link clicked!");
    document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App">
      <nav className={`App-nav ${scrollingDown ? "hidden" : ""}`}>
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/signin" className="nav-link">Sign In</Link>
          </li>
          <li className="nav-item">
            <Link to="/about-us" className="nav-link">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/news" className="nav-link">News</Link>
          </li>
          <li className="nav-item">
            <Link
              to="/products"
              className="nav-link"
              onClick={handleProductsClick}
            >
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/chargingstationinquire" className="nav-link">
              Inquire
            </Link>
          </li>
        </ul>
      </nav>

      <Header />

      <Routes>
        <Route path="/" element={
          <div className="homepage-content">
            <div className="homepage-description">
              <h3>Welcome to the Future-EV Network</h3>
              <p>
                Future EV Sri Lanka is dedicated to advancing the adoption of electric vehicles (EVs) in Sri Lanka by providing a comprehensive and reliable network of charging stations across the country. Our mission is to make electric mobility more accessible, sustainable, and convenient for all Sri Lankans. By expanding the EV charging infrastructure, we aim to support the growing number of electric vehicle users, contribute to reducing carbon emissions, and promote a cleaner, greener future for the island. Join us in driving the future of electric transportation in Sri Lanka!
              </p>
            </div>
          </div>
        } />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/map" element={<SriLankaMap />} />
        <Route path="/news" element={<div>News Page</div>} />
        <Route path="/products" element={<Products />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>

      <div className="homepage-form-container">
        <ChargingStationInquiryForm />
      </div>

      <div className={`feedback-text ${isFeedbackVisible ? "visible" : ""}`}>
        <h1>Feedback</h1>
      </div>

      <div className="feedback-container">
        <AlignItemsList />
      </div>

      <div className="app-download-section">
        <h3>Download Our App</h3>
        <b>Stay connected with Future-EV Sri Lanka. Download our mobile app for convenient access to EV charging station locations, updates, and more.</b>
        <div className="download-links">
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
            <img src={playstoreLogo} alt="Download from Play Store" className="download-logo" />
          </a>
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
            <img src={appstoreLogo} alt="Download from App Store" className="download-logo" />
          </a>
        </div>
      </div>

      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default App;
