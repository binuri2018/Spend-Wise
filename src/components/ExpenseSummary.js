import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db, collection, query, where, onSnapshot } from "../firebase";

const COLORS = ["#f87171", "#60a5fa", "#facc15", "#34d399", "#a78bfa", "#fb923c"];

export default function ExpenseSummary() {
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    const q = query(collection(db, "expenses"), where("userId", "==", currentUser.uid));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setExpenses(data);
    });
    return unsub;
  }, [currentUser]);

  const total = expenses.reduce((acc, e) => acc + Number(e.amount), 0);
  const avg = expenses.length > 0 ? total / expenses.length : 0;

  const byCategory = expenses.reduce((acc, e) => {
    const cat = e.type || "Other";
    acc[cat] = (acc[cat] || 0) + Number(e.amount);
    return acc;
  }, {});

  return (
    <div>
      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="summary-box">
          <h3>Total Expenses</h3>
          <p>{expenses.length}</p>
        </div>
        <div className="summary-box">
          <h3>Total Spent</h3>
          <p>Rs. {total.toFixed(2)}</p>
        </div>
        <div className="summary-box">
          <h3>Average</h3>
          <p>Rs. {avg.toFixed(2)}</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div style={{ marginTop: "1rem" }}>
        {Object.entries(byCategory).map(([cat, amount], idx) => {
          const percent = (amount / total) * 100 || 0;
          return (
            <div key={cat} style={{ marginBottom: "0.6rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{cat}</span>
                <span>₹ {amount.toFixed(2)} ({percent.toFixed(0)}%)</span>
              </div>
              <div style={{
                height: "6px",
                background: "#334155",
                borderRadius: "3px",
                overflow: "hidden"
              }}>
                <div style={{
                  width: `${percent}%`,
                  background: COLORS[idx % COLORS.length],
                  height: "100%"
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
