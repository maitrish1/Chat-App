import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, Box, Button, Card, CardActions, CardContent, IconButton, InputAdornment, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;
const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayName, setdisplayName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [file, setFile] = useState();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  function handleFileChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box sx={{height:'100vh', width:'100vw', display:"flex", alignItems:'center', justifyContent:'center', backgroundImage: 'linear-gradient(323deg, rgba(0,0,0,1) 9%, rgba(43,43,43,1) 32%, rgba(29,29,29,1) 68%, rgba(66,66,66,1) 100%, rgba(0,0,0,1) 100%)',}}>
      <Card sx={{ width:'300px' }}>
    <CardContent sx={{display:'flex', flexDirection:'column', }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit} >
          <Box sx={{display:'flex', flexDirection:'column', gap:2}}>
          <TextField
            onChange={(e) => setdisplayName(e.target.value)}
            value={displayName}
            size="small"
            required
            type="text"
            placeholder="Display Name"
          />
          <TextField
            onChange={(e) => setemail(e.target.value)}
            value={email}
            size="small"
            required
            type="email"
            placeholder="Email"
          />

            <OutlinedInput size="small" onChange={(e) => setpassword(e.target.value)} value={password}
            id="outlined-adornment-password" placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff/> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          </Box>
          
          <Box my={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center", gap:2
            }}
          >
            <Avatar src={file} />
            <Button 
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              href="#file-upload"
            >
              <Typography padding={0} align="center" fontSize='10px'>
                Select Profile Photo.
              </Typography>
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
          </Box>

          <LoadingButton type="submit" fullWidth size="small" variant="contained" loading={loading} disabled={loading}>
            Sign up
          </LoadingButton>
          <Stack flexDirection='column'>
          {loading && <Typography fontSize='10px'>Compressing Image...</Typography>}
          {err && <Typography fontSize='10px' color='red'>Something went wrong</Typography>}
          </Stack>
         
        </form>
        <Typography sx={{mt:2}} variant="body2">
          Have an account? <Link to="/login">Login</Link>
        </Typography>
    </CardContent>

  </Card>
    </Box>
    
  );
};

export default Register;
