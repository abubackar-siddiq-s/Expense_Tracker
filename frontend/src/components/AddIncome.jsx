import React, { useState, useContext } from "react";

import { UserContext } from "../context/UserContext.jsx";

const AddIncome = () => {
  const { user } = useContext(UserContext);
  // userId is not used, only token is needed for requests
  const token = user?.token;

  // State variables to hold the form input values
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");

  // State to manage validation errors
  const [errors, setErrors] = useState({});
  // State to manage general feedback messages (success, info, etc.)
  const [feedbackMessage, setFeedbackMessage] = useState({
    text: "",
    type: "",
  });

  // Handler for input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "incomeAmount") {
      setAmount(value);
    } else if (id === "incomeSource") {
      setSource(value);
    } else if (id === "incomeDate") {
      setDate(value);
    }
  };

  // Function to validate the form
  const validateForm = () => {
    const newErrors = {};
    if (amount === "" || parseFloat(amount) <= 0) {
      newErrors.amount = "Amount must be a positive number.";
    }
    if (source.trim() === "") {
      newErrors.source = "Source cannot be empty.";
    }
    if (date === "") {
      newErrors.date = "Date cannot be empty.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handler for form submission
  const handleAddIncome = async () => {
    // Run validation before proceeding
    if (!validateForm()) {
      setFeedbackMessage({
        text: "Please fix the errors in the form.",
        type: "error",
      });
      return;
    }

    setFeedbackMessage({ text: "Adding income...", type: "info" });

    // Create an income object to send to the backend
    const newIncome = {
      amount: parseFloat(amount),
      source: source.trim(),
      date: date,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/incomes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(newIncome),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add income");
      }

      const addedIncome = await response.json();
      console.log("New Income Added:", addedIncome);
      setFeedbackMessage({
        text: `Successfully added income from ${addedIncome.source}!`,
        type: "success",
      });

      // Clear the form fields and errors after successful submission
      setAmount("");
      setSource("");
      setDate("");
      setErrors({});
      // Optionally, trigger a dashboard refresh (emit event or use context)
      if (window.dispatchEvent) {
        window.dispatchEvent(new Event("incomeOrExpenseChanged"));
      }
    } catch (error) {
      console.error("Error adding income:", error);
      setFeedbackMessage({ text: `Error: ${error.message}`, type: "error" });
    }
  };

  // Allow form submission on Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddIncome();
    }
  };

  return (
    <div className="AddIncome-container">
      <h2 className="AddIncome-title">Add New Income</h2>
      <p className="AddIncome-description">Enter your income details below.</p>

      {/* General feedback message display */}
      {feedbackMessage.text && (
        <div
          className={`AddIncome-message AddIncome-message-${feedbackMessage.type}`}
        >
          {feedbackMessage.text}
        </div>
      )}

      <div className="AddIncome-form-group">
        <label htmlFor="incomeAmount" className="AddIncome-label">
          Amount (₹):
        </label>
        <input
          type="number"
          id="incomeAmount"
          className={`AddIncome-input ${errors.amount ? "input-error" : ""}`}
          placeholder="e.g., 5000"
          value={amount}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        {/* Display validation error for amount */}
        {errors.amount && <p className="validation-error">{errors.amount}</p>}
      </div>

      <div className="AddIncome-form-group">
        <label htmlFor="incomeSource" className="AddIncome-label">
          Source:
        </label>
        <input
          type="text"
          id="incomeSource"
          className={`AddIncome-input ${errors.source ? "input-error" : ""}`}
          placeholder="e.g., Salary, Freelance"
          value={source}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        {/* Display validation error for source */}
        {errors.source && <p className="validation-error">{errors.source}</p>}
      </div>

      <div className="AddIncome-form-group">
        <label htmlFor="incomeDate" className="AddIncome-label">
          Date:
        </label>
        <input
          type="date"
          id="incomeDate"
          className={`AddIncome-input ${errors.date ? "input-error" : ""}`}
          value={date}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        {/* Display validation error for date */}
        {errors.date && <p className="validation-error">{errors.date}</p>}
      </div>

      <button className="AddIncome-button" onClick={handleAddIncome}>
        Add Income
      </button>
    </div>
  );
};

export default AddIncome;
