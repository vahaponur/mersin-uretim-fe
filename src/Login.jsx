import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Replace "your-username" and "your-password" with the desired login credentials
    if (username === "admin" && password === "ayb123") {
      onLogin(true);
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="form-signin text-center">
      <form>
      <input
        className="justift-content-center"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input

        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      </form>

    </div>
  );
};

export default Login;
