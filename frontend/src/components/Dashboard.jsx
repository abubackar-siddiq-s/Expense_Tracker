import { useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "../context/UserContext.jsx";

const Dashboard = () => {
  // Get userId from context
  const { user } = useContext(UserContext);
  const userId = user?.userId;
  const token = user?.token;

  // State to store income and expense data fetched from the backend
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoized fetchData so it can be used in useEffect and handlers
  const fetchData = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);

      // Fetch incomes for the specific user (use auth header if token exists)
      const incomesResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/incomes`,
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      if (!incomesResponse.ok) {
        throw new Error("Failed to fetch incomes");
      }
      const incomesData = await incomesResponse.json();
      setIncomes(incomesData);

      // Fetch expenses for the specific user (use auth header if token exists)
      const expensesResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/expenses`,
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      if (!expensesResponse.ok) {
        throw new Error("Failed to fetch expenses");
      }
      const expensesData = await expensesResponse.json();
      setExpenses(expensesData);

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId, token]);

  // useEffect hook to perform data fetching when the component mounts or userId changes

  useEffect(() => {
    fetchData();
    // Listen for income/expense changes to refresh dashboard
    const handler = () => fetchData();
    window.addEventListener("incomeOrExpenseChanged", handler);
    return () => window.removeEventListener("incomeOrExpenseChanged", handler);
  }, [fetchData]);

  // Calculate total income and total expenses
  const totalIncome = incomes.reduce(
    (sum, income) => sum + parseFloat(income.amount),
    0
  );
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );
  const netSavings = totalIncome - totalExpenses;

  if (!userId) {
    return <div>Please log in to view your dashboard.</div>;
  }

  // Handler for deleting an income entry
  const handleDeleteIncome = async (id) => {
    if (!window.confirm("Are you sure you want to delete this income entry?")) {
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/incomes/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete income");
      }
      // Update the state to remove the deleted income
      setIncomes(incomes.filter((income) => income._id !== id));
    } catch (err) {
      console.error("Error deleting income:", err);
      setError(err.message);
    }
  };

  // Handler for deleting an expense entry
  const handleDeleteExpense = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this expense entry?")
    ) {
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/expenses/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }
      // Update the state to remove the deleted expense
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (err) {
      console.error("Error deleting expense:", err);
      setError(err.message);
    }
  };

  // Render a loading state while fetching data
  if (loading) {
    return (
      <div className="Dashboard-container">
        <h2 className="Dashboard-title">Dashboard Overview</h2>
        <p className="Dashboard-description">Loading data...</p>
      </div>
    );
  }

  // Render an error message if the fetch fails
  if (error) {
    return (
      <div className="Dashboard-container">
        <h2 className="Dashboard-title">Dashboard Overview</h2>
        <p className="Dashboard-description validation-error">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="Dashboard-container">
      <h2 className="Dashboard-title">Dashboard Overview</h2>
      <p className="Dashboard-description">
        This is where you'll see your financial summary, charts, and recent
        transactions.
      </p>

      <div className="Dashboard-summary-grid">
        <div className="Dashboard-card Dashboard-income-card">
          <h3 className="Dashboard-card-title">Total Income</h3>
          <p className="Dashboard-card-value">
            ₹ {totalIncome.toLocaleString()}
          </p>
        </div>
        <div className="Dashboard-card Dashboard-expense-card">
          <h3 className="Dashboard-card-title">Total Expenses</h3>
          <p className="Dashboard-card-value">
            ₹ {totalExpenses.toLocaleString()}
          </p>
        </div>
        <div className="Dashboard-card Dashboard-savings-card">
          <h3 className="Dashboard-card-title">Net Savings</h3>
          <p className="Dashboard-card-value">
            ₹ {netSavings.toLocaleString()}
          </p>
        </div>
      </div>

      {/* New section to display recent incomes */}
      <div className="Dashboard-recent-transactions">
        <h3 className="Dashboard-list-title" style={{ marginTop: "2rem" }}>
          Recent Incomes
        </h3>
        <ul className="ManageCategories-list">
          {incomes.length > 0 ? (
            incomes.map((income) => (
              <li key={income._id} className="ManageCategories-list-item">
                <span className="ManageCategories-category-name">
                  {income.source}
                </span>
                <div className="Dashboard-income-details">
                  <span style={{ fontWeight: "bold" }}>
                    ₹ {income.amount.toLocaleString()}
                  </span>
                  <span style={{ color: "#8e8e93", fontSize: "0.85rem" }}>
                    {" "}
                    ({new Date(income.date).toLocaleDateString()})
                  </span>
                  <button
                    onClick={() => handleDeleteIncome(income._id)}
                    className="Delete-button"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="ManageCategories-no-items">No incomes added yet.</li>
          )}
        </ul>
      </div>

      {/* New section to display recent expenses */}
      <div className="Dashboard-recent-transactions">
        <h3 className="Dashboard-list-title" style={{ marginTop: "2rem" }}>
          Recent Expenses
        </h3>
        <ul className="ManageCategories-list">
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <li key={expense._id} className="ManageCategories-list-item">
                <span className="ManageCategories-category-name">
                  {expense.category}
                </span>
                <div className="Dashboard-expense-details">
                  <span style={{ fontWeight: "bold" }}>
                    ₹ {expense.amount.toLocaleString()}
                  </span>
                  <span style={{ color: "#8e8e93", fontSize: "0.85rem" }}>
                    {" "}
                    ({new Date(expense.date).toLocaleDateString()})
                  </span>
                  <button
                    onClick={() => handleDeleteExpense(expense._id)}
                    className="Delete-button"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="ManageCategories-no-items">
              No expenses added yet.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
