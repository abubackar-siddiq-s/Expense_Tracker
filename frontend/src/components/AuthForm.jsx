import React, { useState } from "react";

const AuthForm = ({ onAuthSuccess }) => {
  // State to toggle between login and register views
  const [isLogin, setIsLogin] = useState(true);
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State for feedback messages
  const [feedbackMessage, setFeedbackMessage] = useState({
    text: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);

  // Function to handle form submission (login or register)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedbackMessage({ text: "", type: "" });

    const endpoint = isLogin ? "/api/users/login" : "/api/users/register";
    const body = { email, password };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      // Handle successful authentication
      setFeedbackMessage({ text: data.message, type: "success" });
      console.log("Authentication successful:", data);

      // Call the parent function to update the app's global state with user info
      if (isLogin) {
        // Use backend's user object for both userId and email
        const userData = {
          userId: data.user?._id || data.userId || data._id || data.id,
          email: data.user?.email || email,
          token: data.token || null,
        };
        onAuthSuccess(userData);
      }
    } catch (error) {
      console.error("Authentication failed:", error.message);
      setFeedbackMessage({ text: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Auth-container">
      <h2 className="Auth-title">{isLogin ? "Login" : "Register"}</h2>
      <p className="Auth-description">
        {isLogin
          ? "Welcome back! Please login to continue."
          : "Join the Expense Tracker community!"}
      </p>

      {/* Feedback message display */}
      {feedbackMessage.text && (
        <div className={`Auth-message Auth-message-${feedbackMessage.type}`}>
          {feedbackMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="Auth-form">
        <div className="Auth-form-group">
          <label htmlFor="email" className="Auth-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="Auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="Auth-form-group">
          <label htmlFor="password" className="Auth-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="Auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="Auth-button" disabled={loading}>
          {loading ? "Loading..." : isLogin ? "Login" : "Register"}
        </button>
      </form>

      <div className="Auth-toggle">
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            className="Auth-toggle-link"
            onClick={() => {
              setIsLogin(!isLogin);
              setFeedbackMessage({ text: "", type: "" }); // Clear messages on toggle
            }}
          >
            {isLogin ? " Register" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
