import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function ExpenseChart() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(collection(db, "expenses"), where("userId", "==", auth.currentUser.uid));

    const unsub = onSnapshot(q, (snapshot) => {
      setExpenses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, []);

  // ---- Pie Chart Data (by Category) ----
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categoryTotals),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"],
      },
    ],
  };

  // ---- Bar Chart Data (by Month) ----
  const monthTotals = expenses.reduce((acc, exp) => {
    if (exp.createdAt?.toDate) {
      const month = exp.createdAt.toDate().toLocaleString("default", { month: "short" });
      acc[month] = (acc[month] || 0) + exp.amount;
    }
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(monthTotals),
    datasets: [
      {
        label: "Monthly Expenses",
        data: Object.values(monthTotals),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  return (
    <div className="charts">
      <h2>Expense Analytics</h2>
      <div className="chart-container">
        <div className="chart">
          <h3>By Category</h3>
          <Pie data={pieData} />
        </div>
        <div className="chart">
          <h3>By Month</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}

export default ExpenseChart;
