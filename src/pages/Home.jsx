import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { Box, Card, Stack } from '@mui/material'

const Home = () => {
  return (
    <Box sx={{background: 'linear-gradient(323deg, rgba(0,0,0,1) 9%, rgba(43,43,43,1) 32%, rgba(29,29,29,1) 68%, rgba(66,66,66,1) 100%, rgba(0,0,0,1) 100%)'}} height='100vh' display='flex' alignItems='center' justifyContent='center'>
      <Card sx={{width:'70%', height:'80%', display:'flex'}}>
        <Stack width='30%' height='100%'>
        <Sidebar/>
        </Stack>
        
        <Stack width='70%' height='100%'>
        <Chat/>
        </Stack>
       
      </Card>
    </Box>
  )
}

export default Home