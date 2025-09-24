import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", category: "", amount: "" });

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "expenses"),
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setExpenses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "expenses", id));
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setEditData({ title: expense.title, category: expense.category, amount: expense.amount });
  };

  const handleUpdate = async (id) => {
    await updateDoc(doc(db, "expenses", id), {
      ...editData,
      amount: Number(editData.amount),
    });
    setEditingId(null);
  };

  return (
    <div className="expense-list">
      <h2>Your Expenses</h2>
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
              <td>
                {editingId === exp.id ? (
                  <input
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  />
                ) : (
                  exp.title
                )}
              </td>
              <td>
                {editingId === exp.id ? (
                  <select
                    value={editData.category}
                    onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  >
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Travel">Travel</option>
                  </select>
                ) : (
                  exp.category
                )}
              </td>
              <td>
                {editingId === exp.id ? (
                  <input
                    type="number"
                    value={editData.amount}
                    onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                  />
                ) : (
                  `$${exp.amount}`
                )}
              </td>
              <td>
                {exp.createdAt?.toDate
                  ? exp.createdAt.toDate().toLocaleDateString()
                  : "—"}
              </td>
              <td>
                {editingId === exp.id ? (
                  <button onClick={() => handleUpdate(exp.id)}>✅</button>
                ) : (
                  <button onClick={() => handleEdit(exp)}>✏️</button>
                )}
                <button onClick={() => handleDelete(exp.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
