import React from 'react';

// Helper component for individual navigation items
const NavItem = ({ page, currentPage, onClick, children }) => {
  const isActive = page === currentPage;
  const classes = `App-nav-item ${isActive ? 'active' : ''}`;

  return (
    <button
      onClick={() => onClick(page)}
      className={classes}
    >
      {children}
    </button>
  );
};

// Navbar Component
// Now receives login state and user name as props from App.js
const Navbar = ({ activePage, setActivePage, isLoggedIn, userName, onLoginLogout }) => {

  return (
    <nav className="App-navbar">
      <div className="App-navbar-container">
        {/* App Title/Logo */}
        <div className="App-navbar-title">
          Expense Tracker
        </div>

        {/* Navigation Links */}
        <div className="App-navbar-links">
          <NavItem page="dashboard" currentPage={activePage} onClick={setActivePage}>
            Dashboard
          </NavItem>
          <NavItem page="add-income" currentPage={activePage} onClick={setActivePage}>
            Add Income
          </NavItem>
          <NavItem page="add-expense" currentPage={activePage} onClick={setActivePage}>
            Add Expense
          </NavItem>
          <NavItem page="manage-categories" currentPage={activePage} onClick={setActivePage}>
            Categories
          </NavItem>
        </div>

        {/* Login/Menu Button */}
        <div className="App-login-button-wrapper">
          {isLoggedIn ? (
            <div className="user-profile">
              <span className="user-name">Hi, {userName}</span>
              <button 
                className="App-login-button"
                onClick={onLoginLogout} // Calls the function from App.js
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="App-login-button"
              onClick={onLoginLogout} // Calls the function from App.js
            >
              Login / Menu
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;