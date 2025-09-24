import React from "react";

function ExpenseList() {
  const expenses = [
    
  ];

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
          {expenses.map((exp, idx) => (
            <tr key={idx}>
              <td>{exp.title}</td>
              <td>{exp.category}</td>
              <td>${exp.amount}</td>
              <td>{exp.date}</td>
              <td>
                <button className="edit-btn">✏️</button>
                <button className="delete-btn">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
