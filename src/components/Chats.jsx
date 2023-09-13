import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <Box sx={{overflowY:'scroll', mt:2}}>
      {Object?.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <List disablePadding
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            <ListItem disablePadding
              alignItems="flex-start"
              sx={{
                borderBottom: "1px solid #ccc",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{ width: "40px", height: "40px" }}
                  src={chat[1].userInfo.photoURL}
                />
              </ListItemAvatar>
              <ListItemText
                primary={chat[1].userInfo.displayName}
                secondary={
                  <React.Fragment>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ marginTop: "4px" }}
                    >
                      {chat[1].lastMessage?.text}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        ))}
    </Box>
  );
};

export default Chats;
