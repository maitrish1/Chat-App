import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import { Box, Card, CardContent, Divider } from "@mui/material";

const Sidebar = () => {
  return (
    <Card sx={{p:2, height:'100%'}}>
        <Navbar />
        <Search />
        <Chats />
    </Card>
  );
};

export default Sidebar;
