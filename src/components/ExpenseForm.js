// src/components/ExpenseForm.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";

export default function ExpenseForm({ editingExpense, clearEdit }) {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [type, setType] = useState("Entertainment");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = ["Entertainment", "Food & Dining", "Travel", "Health", "Other"];

  useEffect(() => {
    if (editingExpense) {
      setName(editingExpense.name);
      setType(editingExpense.type);
      setAmount(editingExpense.amount);
    } else {
      setName("");
      setType("Entertainment");
      setAmount("");
    }
  }, [editingExpense]);

  const handleSubmit = async (e) => {
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
      if (editingExpense) {
        await updateDoc(doc(db, "expenses", editingExpense.id), {
          name,
          type,
          amount: amt,
        });
        clearEdit();
      } else {
        await addDoc(collection(db, "expenses"), {
          userId: currentUser.uid,
          name,
          type,
          amount: amt,
          createdAt: serverTimestamp(),
        });
      }

      setName("");
      setType("Entertainment");
      setAmount("");
    } catch (err) {
      console.error("Error saving expense:", err);
      setError(editingExpense ? "Failed to update expense." : "Failed to add expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="form">
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

        {/* Flex container for buttons */}
        <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
          {/* Add / Update Button */}
          <button
            type="submit"
            className="btn"
            disabled={loading}
            style={{ padding: "0.5rem 1rem" }}
          >
            {loading
              ? editingExpense
                ? "Updating..."
                : "Adding..."
              : editingExpense
              ? "Update Expense"
              : "Add Expense"}
          </button>

          {/* Cancel Button aligned to right */}
          {editingExpense && (
            <button
              type="button"
              onClick={clearEdit}
              style={{
                marginLeft: "auto", // pushes it to the right
                padding: "0.5rem 1rem",
                backgroundColor: "#fc4444ff",
                color: "#ffffff",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f51e1eff")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fc4444ff")}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
