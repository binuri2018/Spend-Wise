// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, createUserWithEmailAndPassword, updateProfile, provider, signInWithPopup } from "../firebase";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      navigate("/");
    } catch (error) {
      setErr(error.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div
      className="auth-page"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#0f172a",
      }}
    >
      <form
        className="card"
        onSubmit={handleRegister}
        style={{
          backgroundColor: "#1e293b",
          padding: "2rem",
          borderRadius: "0.5rem",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          color: "#f9fafb",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Create Account</h2>
        {err && (
          <div
            style={{
              backgroundColor: "#fc4444ff",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
              textAlign: "center",
            }}
          >
            {err}
          </div>
        )}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "0.5rem 1rem",
            alignSelf: "center",
            borderRadius: "0.25rem",
            border: "none",
            outline: "none",
            fontSize: "1rem",
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "0.5rem 1rem",
            alignSelf: "center",
            borderRadius: "0.25rem",
            border: "none",
            outline: "none",
            fontSize: "1rem",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "0.5rem 1rem",
            alignSelf: "center",
            borderRadius: "0.25rem",
            border: "none",
            outline: "none",
            fontSize: "1rem",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#3b82f6",
            color: "#fff",
            borderRadius: "0.25rem",
            fontWeight: "500",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
        >
          Register
        </button>

        <button
          type="button"
          onClick={handleGoogle}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#fc4444ff",
            color: "#fff",
            borderRadius: "0.25rem",
            fontWeight: "500",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f51e1eff")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fc4444ff")}
        >
          Sign up with Google
        </button>

        <p style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#3b82f6", textDecoration: "underline" }}>
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
