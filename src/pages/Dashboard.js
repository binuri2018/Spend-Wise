// src/pages/Dashboard.js
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Charts from "../components/Charts";
import { auth, signOut } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="container">
      <header className="topbar">
        <div>
          <h1>Expense Tracker</h1>
          <p className="muted">Welcome, <strong>{currentUser?.displayName || currentUser?.email}</strong></p>
        </div>
        <div className="top-actions">
          <button className="btn outline" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main>
        <section className="left-col">
          <ExpenseForm />
          <ExpenseList />
        </section>

        <aside className="right-col">
          <Charts />
        </aside>
      </main>
    </div>
  );
}
