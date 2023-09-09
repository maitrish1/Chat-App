import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { TextField, Typography } from "@mui/material";

const Login = () => {
  const [err, setErr] = useState(false);
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(e.target);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
        <form onSubmit={handleSubmit}>
          <TextField size="small" onChange={(e)=>setemail(e.target.value)}
            type="email"
            placeholder="Email"
            id="email"
            value={email}
          />
           <TextField size="small" onChange={(e)=>setpassword(e.target.value)}
            type="password"
            placeholder="Password"
            id="password"
            value={password}
          />
          <button type="submit">Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
