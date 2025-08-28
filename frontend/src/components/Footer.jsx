import React from 'react';

const Footer = () => {
  return (
    <footer className="App-footer">
      <div className="App-footer-container">
        {/* Section 1: Brand and Copyright */}
        <div className="App-footer-section App-footer-brand">
          <h3 className="App-footer-title">Expense Tracker</h3>
          <p className="App-footer-text">
            Track your finances with ease.
          </p>
          <p className="App-footer-copyright">
            &copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.
          </p>
        </div>

        {/* Section 2: Products/Features Links */}
        <div className="App-footer-section">
          <h4 className="App-footer-heading">Features</h4>
          <ul className="App-footer-links-list">
            <li><a href="#dashboard" className="App-footer-link">Dashboard</a></li>
            <li><a href="#add-income" className="App-footer-link">Add Income</a></li>
            <li><a href="#add-expense" className="App-footer-link">Add Expense</a></li>
            <li><a href="#manage-categories" className="App-footer-link">Manage Categories</a></li>
          </ul>
        </div>

        {/* Section 3: Company/About Links */}
        <div className="App-footer-section">
          <h4 className="App-footer-heading">Company</h4>
          <ul className="App-footer-links-list">
            <li><a href="#about" className="App-footer-link">About Us</a></li>
            <li><a href="#careers" className="App-footer-link">Careers</a></li>
            <li><a href="#blog" className="App-footer-link">Blog</a></li>
            <li><a href="#contact" className="App-footer-link">Contact</a></li>
          </ul>
        </div>

        {/* Section 4: Legal & Social Media */}
        <div className="App-footer-section">
          <h4 className="App-footer-heading">Legal & Social</h4>
          <ul className="App-footer-links-list">
            <li><a href="#terms" className="App-footer-link">Terms of Service</a></li>
            <li><a href="#privacy" className="App-footer-link">Privacy Policy</a></li>
            <li><a href="#disclaimer" className="App-footer-link">Disclaimer</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;