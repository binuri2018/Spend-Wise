import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <div className="dashboard">
      <Navbar user={user} />
      <h1>Welcome back, {user?.displayName || "User"} 👋</h1>
      <p>Track and manage your expenses with ease</p>

      <ExpenseForm />
      <ExpenseList />
    </div>
  );
}

export default Dashboard;
