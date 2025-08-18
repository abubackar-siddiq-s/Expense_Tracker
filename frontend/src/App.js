import React, { useState } from "react";
import { UserProvider, UserContext } from "./context/UserContext.jsx";
import "./App.css"; // Import the main CSS file

// Import all individual components from the 'components' folder
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AddIncome from "./components/AddIncome.jsx";
import AddExpense from "./components/AddExpense.jsx";
import ManageCategories from "./components/ManageCategories.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import AuthForm from "./components/AuthForm.jsx"; // Import the AuthForm component

const App = () => {
  const [activePage, setActivePage] = useState("dashboard");

  // Use context for user authentication
  // We'll use UserProvider to wrap the app below

  // Function to handle login/logout logic
  const handleLoginLogout = (user, setUser) => {
    if (user) {
      setUser(null);
      setActivePage("dashboard");
      console.log("User logged out.");
    } else {
      setActivePage("auth");
      console.log("Redirecting to auth page.");
    }
  };

  // Function to render the correct page based on the activePage state
  const renderPage = (user, setUser) => {
    // Render AuthForm when a user is not logged in and requests the 'auth' page
    if (activePage === "auth" && !user) {
      return (
        <AuthForm
          onAuthSuccess={(userData) => {
            setUser(userData);
            setActivePage("dashboard");
          }}
        />
      );
    }

    // Define protected routes
    const protectedRoutes = ["add-income", "add-expense", "manage-categories"];

    // Check if the current page is a protected route and the user is not logged in
    if (protectedRoutes.includes(activePage) && !user) {
      return (
        <div className="App-message-info">
          You must be logged in to view this page. Please{" "}
          <span
            className="App-message-link"
            onClick={() => setActivePage("auth")}
          >
            Login
          </span>
          .
        </div>
      );
    }

    switch (activePage) {
      case "dashboard":
        return (
          <>
            <Hero />
            {user ? <Dashboard /> : null}
          </>
        );
      case "add-income":
        return <AddIncome />;
      case "add-expense":
        return <AddExpense />;
      case "manage-categories":
        return <ManageCategories />;
      default:
        return (
          <>
            <Hero />
            <Dashboard />
          </>
        );
    }
  };

  return (
    <UserProvider>
      <UserContext.Consumer>
        {({ user, setUser }) => (
          <div className="App">
            <Navbar
              activePage={activePage}
              setActivePage={setActivePage}
              isLoggedIn={!!user}
              userName={user ? user.email.split("@")[0] : ""}
              onLoginLogout={() => handleLoginLogout(user, setUser)}
            />

            {/* Render the login message here, outside of the main content area, when not logged in */}
            {!user && (
              <p className="App-message-info App-message-no-login">
                You are not logged in. Please click "Login / Menu" to access the
                app features.
              </p>
            )}

            <main className="App-main-content">
              {renderPage(user, setUser)}
            </main>

            <Footer setActivePage={setActivePage} />
          </div>
        )}
      </UserContext.Consumer>
    </UserProvider>
  );
};

export default App;
