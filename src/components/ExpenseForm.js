// src/components/ExpenseForm.js
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ExpenseForm() {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [type, setType] = useState("Entertainment");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = ["Entertainment", "Food & Dining", "Travel", "Health", "Other"];

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !amount) {
      setError("Please fill in both name and amount.");
      return;
    }

    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      setError("Enter a valid positive amount.");
      return;
    }

    if (!currentUser) {
      setError("You must be logged in to add expenses.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "expenses"), {
        userId: currentUser.uid,
        name,
        type,
        amount: amt,
        createdAt: serverTimestamp(),
      });

      // reset form
      setName("");
      setAmount("");
      setType("Entertainment");
    } catch (err) {
      console.error("Error adding expense:", err);
      setError("Failed to add expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>Add Expense</h3>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleAdd} className="form">
        <div className="form-group">
          <label htmlFor="expName">Expense Name</label>
          <input
            id="expName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Movie ticket"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="expType">Category</label>
          <select
            id="expType"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="expAmount">Amount</label>
          <input
            id="expAmount"
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
}
