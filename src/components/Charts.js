// src/components/Charts.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db, collection, query, where, onSnapshot } from "../firebase";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";


const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c"];

export default function Charts() {
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    const q = query(collection(db, "expenses"), where("userId", "==", currentUser.uid));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setExpenses(data);
    });
    return unsub;
  }, [currentUser]);

  // Aggregate by category
  const byCategory = expenses.reduce((acc, e) => {
    const cat = e.type || "Other";
    acc[cat] = (acc[cat] || 0) + Number(e.amount || 0);
    return acc;
  }, {});

  const pieData = Object.entries(byCategory).map(([name, value]) => ({ name, value }));
  const barData = pieData.map(d => ({ name: d.name, amount: d.value }));

  return (
    <div className="card">
      <h3>Analysis</h3>
      {expenses.length === 0 ? (
        <p className="muted">Add expenses to see charts.</p>
      ) : (
        <>
          <div style={{ height: 220 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ height: 260, marginTop: 20 }}>
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" name="Amount">
                  {barData.map((entry, idx) => (
                    <Cell key={`barcell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
