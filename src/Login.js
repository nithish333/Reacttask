import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          onLogin();
        } else {
          setError("Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while logging in");
      });
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <div>
        <label>
          Username
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button style={{ marginTop: "20px" }} onClick={handleLogin}>
        Login
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
