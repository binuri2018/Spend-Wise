// src/components/ExpenseList.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db, collection, query, where, orderBy, onSnapshot } from "../firebase";

export default function ExpenseList() {
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, "expenses"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setExpenses(data);
    });

    return unsub;
  }, [currentUser]);

  return (
    <div className="card">
      <h3>Your Expenses</h3>
      {expenses.length === 0 ? (
        <p className="muted">No expenses yet. Add one above.</p>
      ) : (
        <ul className="expense-list">
          {expenses.map(exp => (
            <li key={exp.id} className="expense-item">
              <div>
                <div className="exp-name">{exp.name}</div>
                <div className="muted small">{exp.type}</div>
              </div>
              <div className="exp-amount">₹ {Number(exp.amount).toFixed(2)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
