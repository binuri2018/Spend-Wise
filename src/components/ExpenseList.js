import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db, collection, query, where, orderBy, onSnapshot } from "../firebase";
import { FaTrash, FaEdit } from "react-icons/fa";

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
    <div className="expense-list">
      {expenses.length === 0 ? (
        <p className="muted">No expenses yet. Add one above.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.name}</td>
                <td>{exp.type}</td>
                <td>Rs. {Number(exp.amount).toFixed(2)}</td>
                <td>{exp.createdAt?.toDate?.().toLocaleDateString()}</td>
                <td>
                  <button className="action-btn edit"><FaEdit /></button>
                  <button className="action-btn delete"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
