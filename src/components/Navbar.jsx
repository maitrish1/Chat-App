import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { Avatar, Box, IconButton, Stack } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <Box>
      <Stack flexDirection='row' mb={2} alignItems='center' justifyContent='space-between' >
        <Stack alignItems='center' flexDirection='row' gap={2}>
        <Avatar src={currentUser.photoURL}/>
        <span>{currentUser.displayName}</span>
        </Stack>
       
        <IconButton  onClick={()=>signOut(auth)}>
          <LogoutIcon/>
        </IconButton>
      </Stack>
    </Box>
  )
}

export default Navbar