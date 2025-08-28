import React, { useState, useEffect, useContext, useCallback } from "react";

import { UserContext } from "../context/UserContext.jsx";

const AddExpense = () => {
  const { user } = useContext(UserContext);
  const userId = user?.userId;
  const token = user?.token;

  // State variables for form inputs and feedback
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  // State to manage validation errors
  const [errors, setErrors] = useState({});
  // State to manage general feedback messages (success, info, etc.)
  const [feedbackMessage, setFeedbackMessage] = useState({
    text: "",
    type: "",
  });

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Memoized fetchCategories so it can be used in useEffect and handlers
  const fetchCategories = useCallback(async () => {
    try {
      // Pass the token for backend to identify the user.
      const response = await fetch(
        `https://expense-tracker-backend-64ve.onrender.com/api/categories`,
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
      if (data.length > 0) {
        setCategory(data[0]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setFeedbackMessage({ text: "Error fetching categories.", type: "error" });
    } finally {
      setLoadingCategories(false);
    }
  }, [token]);

  // Fetch categories from the backend when the component mounts
  useEffect(() => {
    fetchCategories();
  }, [userId, fetchCategories]); // Re-fetch categories if the userId or fetchCategories changes

  // Handler for input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "expenseAmount") {
      setAmount(value);
    } else if (id === "expenseCategory") {
      setCategory(value);
    } else if (id === "expenseDate") {
      setDate(value);
    }
  };

  // Function to validate the form
  const validateForm = () => {
    const newErrors = {};
    if (amount === "" || parseFloat(amount) <= 0) {
      newErrors.amount = "Amount must be a positive number.";
    }
    if (category.trim() === "") {
      newErrors.category = "Category cannot be empty.";
    }
    if (date === "") {
      newErrors.date = "Date cannot be empty.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handler for form submission
  const handleAddExpense = async () => {
    if (!validateForm()) {
      setFeedbackMessage({
        text: "Please fix the errors in the form.",
        type: "error",
      });
      return;
    }

    setFeedbackMessage({ text: "Adding expense...", type: "info" });

    const newExpense = {
      amount: parseFloat(amount),
      category: category.trim(),
      date: date,
    };

    try {
      const response = await fetch("https://expense-tracker-backend-64ve.onrender.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(newExpense),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add expense");
      }

      const addedExpense = await response.json();
      console.log("New Expense Added:", addedExpense);
      setFeedbackMessage({
        text: `Successfully added expense for ${addedExpense.category}!`,
        type: "success",
      });

      setAmount("");
      setCategory(categories.length > 0 ? categories[0] : "");
      setDate("");
      setErrors({});
      // Optionally, trigger a dashboard refresh (emit event or use context)
      if (window.dispatchEvent) {
        window.dispatchEvent(new Event("incomeOrExpenseChanged"));
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      setFeedbackMessage({ text: `Error: ${error.message}`, type: "error" });
    }
  };

  // Allow form submission on Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddExpense();
    }
  };

  return (
    <div className="AddExpense-container">
      <h2 className="AddExpense-title">Add New Expense</h2>
      <p className="AddExpense-description">
        Enter your expense details below.
      </p>

      {feedbackMessage.text && (
        <div
          className={`AddExpense-message AddExpense-message-${feedbackMessage.type}`}
        >
          {feedbackMessage.text}
        </div>
      )}

      <div className="AddExpense-form-group">
        <label htmlFor="expenseAmount" className="AddExpense-label">
          Amount (₹):
        </label>
        <input
          type="number"
          id="expenseAmount"
          className={`AddExpense-input ${errors.amount ? "input-error" : ""}`}
          placeholder="e.g., 1500"
          value={amount}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        {errors.amount && <p className="validation-error">{errors.amount}</p>}
      </div>

      <div className="AddExpense-form-group">
        <label htmlFor="expenseCategory" className="AddExpense-label">
          Category:
        </label>
        {loadingCategories ? (
          <p className="AddExpense-input">Loading categories...</p>
        ) : (
          <select
            id="expenseCategory"
            className={`AddExpense-input ${
              errors.category ? "input-error" : ""
            }`}
            value={category}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        )}
        {errors.category && (
          <p className="validation-error">{errors.category}</p>
        )}
      </div>

      <div className="AddExpense-form-group">
        <label htmlFor="expenseDate" className="AddExpense-label">
          Date:
        </label>
        <input
          type="date"
          id="expenseDate"
          className={`AddExpense-input ${errors.date ? "input-error" : ""}`}
          value={date}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        {errors.date && <p className="validation-error">{errors.date}</p>}
      </div>

      <button className="AddExpense-button" onClick={handleAddExpense}>
        Add Expense
      </button>
    </div>
  );
};

export default AddExpense;
