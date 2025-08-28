import React, { useState, useEffect, useContext, useCallback } from "react";

import { UserContext } from "../context/UserContext.jsx";

const ManageCategories = () => {
  const { user } = useContext(UserContext);
  const userId = user?.userId;
  const token = user?.token;

  // State to hold the value of the new category input field
  const [newCategoryName, setNewCategoryName] = useState("");
  // State to hold the list of existing categories fetched from the backend
  const [categories, setCategories] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState({
    text: "",
    type: "",
  });
  const [loading, setLoading] = useState(true);

  // Memoized fetchCategories so it can be used in useEffect and handlers
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      // Use Authorization header for backend to identify the user.
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/categories`,
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setFeedbackMessage({
        text: `Error fetching categories: ${error.message}`,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [token]);

  // useEffect hook to fetch categories when the component mounts or userId/token changes
  useEffect(() => {
    fetchCategories();
  }, [userId, fetchCategories]);

  // Handler for input change
  const handleInputChange = (event) => {
    setNewCategoryName(event.target.value);
  };

  // Handler for adding a new category
  const handleAddCategory = async () => {
    if (newCategoryName.trim() === "") {
      setFeedbackMessage({
        text: "Category name cannot be empty.",
        type: "error",
      });
      return;
    }

    setFeedbackMessage({ text: "Adding category...", type: "info" });

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ name: newCategoryName.trim() }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add category");
      }

      // Re-fetch the categories list to show the updated data
      await fetchCategories();
      setNewCategoryName("");
      setFeedbackMessage({
        text: `Category "${newCategoryName.trim()}" added successfully!`,
        type: "success",
      });
    } catch (error) {
      console.error("Error adding category:", error);
      setFeedbackMessage({ text: `Error: ${error.message}`, type: "error" });
    }
  };

  // Handler for deleting a category
  const handleDeleteCategory = async (categoryToDelete) => {
    setFeedbackMessage({
      text: `Deleting category "${categoryToDelete}"...`,
      type: "info",
    });

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/categories/${categoryToDelete}`,
        {
          method: "DELETE",
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete category");
      }

      // Re-fetch the categories list to show the updated data
      await fetchCategories();
      setFeedbackMessage({
        text: `Category "${categoryToDelete}" deleted successfully.`,
        type: "success",
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      setFeedbackMessage({ text: `Error: ${error.message}`, type: "error" });
    }
  };

  // State for editing
  const [editingCategory, setEditingCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  // Handler to start editing
  const handleEditCategory = (categoryToEdit) => {
    setEditingCategory(categoryToEdit);
    setEditCategoryName(categoryToEdit);
    setFeedbackMessage({ text: "", type: "" });
  };

  // Handler to cancel editing
  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditCategoryName("");
    setFeedbackMessage({ text: "", type: "" });
  };

  // Handler to save edited category
  const handleSaveEdit = async () => {
    if (editCategoryName.trim() === "") {
      setFeedbackMessage({
        text: "Category name cannot be empty.",
        type: "error",
      });
      return;
    }
    setFeedbackMessage({ text: "Saving category...", type: "info" });
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/categories/${encodeURIComponent(
          editingCategory
        )}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ name: editCategoryName.trim() }),
        }
      );
      if (!response.ok) {
        let errorMsg = "Failed to edit category";
        try {
          errorMsg = (await response.json()).message || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }
      await fetchCategories();
      setFeedbackMessage({
        text: `Category updated to "${editCategoryName.trim()}"!`,
        type: "success",
      });
      setEditingCategory(null);
      setEditCategoryName("");
    } catch (error) {
      setFeedbackMessage({ text: `Error: ${error.message}`, type: "error" });
    }
  };

  // Allow adding on Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddCategory();
    }
  };

  if (loading) {
    return (
      <div className="ManageCategories-container">
        <p className="ManageCategories-description">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="ManageCategories-container">
      <h2 className="ManageCategories-title">Manage Categories</h2>
      <p className="ManageCategories-description">
        Here you can add, edit, or delete your income and expense categories.
      </p>

      {feedbackMessage.text && (
        <div
          className={`AddIncome-message AddIncome-message-${feedbackMessage.type}`}
        >
          {feedbackMessage.text}
        </div>
      )}

      <div className="ManageCategories-add-form">
        <label htmlFor="newCategory" className="ManageCategories-label">
          New Category Name:
        </label>
        <input
          type="text"
          id="newCategory"
          className="ManageCategories-input"
          placeholder="e.g., Entertainment, Gifts"
          value={newCategoryName}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button
          className="ManageCategories-add-button"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
      </div>

      <h3 className="ManageCategories-list-title">Existing Categories</h3>
      <ul className="ManageCategories-list">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <li key={index} className="ManageCategories-list-item">
              {editingCategory === category ? (
                <>
                  <input
                    type="text"
                    className="ManageCategories-input"
                    value={editCategoryName}
                    onChange={(e) => setEditCategoryName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveEdit();
                      if (e.key === "Escape") handleCancelEdit();
                    }}
                    autoFocus
                  />
                  <button
                    className="ManageCategories-add-button"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </button>
                  <button
                    className="ManageCategories-delete-button"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="ManageCategories-category-name">
                    {category}
                  </span>
                  <div className="ManageCategories-actions">
                    <button
                      className="ManageCategories-edit-button"
                      onClick={() => handleEditCategory(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="ManageCategories-delete-button"
                      onClick={() => handleDeleteCategory(category)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <li className="ManageCategories-no-items">
            No categories added yet.
          </li>
        )}
      </ul>
    </div>
  );
};

export default ManageCategories;
