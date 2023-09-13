import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { Avatar, Box, Card, Stack, Typography } from "@mui/material";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <Card>
      <Box
        boxShadow="0px 5px 5px rgba(0, 0, 0, 0.1)" // Add a box shadow here
      >
        <Stack
          height="50px"
          p={1.5}
          flexDirection="row"
          gap={2}
          alignItems="center"
        >
          <Avatar src={data.user.photoURL} alt="" />
          <Typography variant="subtitle1">{data.user?.displayName}</Typography>
        </Stack>
      </Box>
      <Messages />
      <Input />
    </Card>
  );
};

export default Chat;
