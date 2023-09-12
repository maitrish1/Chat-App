import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

const Login = () => {
  const [err, setErr] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(e.target);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "linear-gradient(323deg, rgba(0,0,0,1) 9%, rgba(43,43,43,1) 32%, rgba(29,29,29,1) 68%, rgba(66,66,66,1) 100%, rgba(0,0,0,1) 100%)",
      }}
    >
      <Card sx={{ width:'300px' }}>
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
          <Box sx={{display:'flex', flexDirection:'column', gap:2}}>
            <TextField
              size="small"
              onChange={(e) => setemail(e.target.value)}
              type="email"
              placeholder="Email"
              id="email"
              value={email}
            />
            <TextField
              size="small"
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              placeholder="Password"
              id="password"
              value={password}
            />
            <Button size="small" variant="contained" type="submit">Sign In</Button>
            </Box>
            {err && <span>Something went wrong</span>}
          </form>
          <Typography sx={{mt:2}} variant="body2">
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
