import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseChart from "./ExpenseChart"; // ⬅️ added
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <Navbar user={user} />
      <h1>Welcome back, {user.displayName || user.email} 👋</h1>
      <p>Track and manage your expenses with ease</p>

      <ExpenseForm />
      <ExpenseList />
      <ExpenseChart /> {/* ⬅️ charts added */}
    </div>
  );
}

export default Dashboard;
