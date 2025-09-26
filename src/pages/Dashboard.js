// src/pages/Dashboard.js
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Charts from "../components/Charts";
import ExpenseSummary from "../components/ExpenseSummary";
import { auth, signOut } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillWave, FaSignOutAlt } from "react-icons/fa";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // ✅ State to track which expense is being edited
  const [editingExpense, setEditingExpense] = useState(null);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="dashboard">
      {/* Top Navbar */}
      <header className="navbar">
        <div className="navbar-left">
          <h2 className="logo">
            <FaMoneyBillWave className="logo-icon" /> Expense Tracker
          </h2>
        </div>
        <div className="navbar-right">
          <span className="welcome-text">
            Welcome, {currentUser?.displayName || currentUser?.email}
          </span>
          <button className="btn logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      {/* Greeting */}
      <section className="welcome-card">
        <h1>
          Welcome back,{" "}
          {currentUser?.displayName || currentUser?.email?.split("@")[0]}! 👋
        </h1>
        <p>Track and manage your expenses with ease</p>
      </section>

      <main className="dashboard-grid">
        {/* Left Column */}
        <div className="left-column">
          <div className="card">
            <h2>{editingExpense ? "Edit Expense" : "Add New Expense"}</h2>
            <ExpenseForm
              editingExpense={editingExpense}
              clearEdit={() => setEditingExpense(null)}
            />
          </div>

          <div className="card">
            <h2>Your Expenses</h2>
            <ExpenseList onEdit={(expense) => setEditingExpense(expense)} />
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          <div className="card">
            <h2>Expense Summary</h2>
            <ExpenseSummary />
          </div>

          <div className="card">
            <h2>Expense Charts</h2>
            <Charts />
          </div>
        </div>
      </main>
    </div>
  );
}
