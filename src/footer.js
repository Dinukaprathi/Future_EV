import React from 'react';
import './footer.css'; // Ensure this file contains the styles for the footer

function Footer() {
  return (
    <footer className="App-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>EVStation</p>
          <p>No. 123, Green Lane, Colombo, Sri Lanka</p>
          <p>Email: <a href="mailto:info@evstation.lk">info@evstation.lk</a></p>
          <p>Phone: +94 71 234 5678</p>
          <p>Hotline: +94 11 987 6543</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQs</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul className="social-media">
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 EVStation. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
