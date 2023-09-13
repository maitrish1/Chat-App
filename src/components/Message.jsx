import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import moment from 'moment';

const MessageContainer = styled(Box)(({ owner }) => ({
  display: "flex",
  flexDirection: owner ? "row-reverse" : "row",
  marginBottom: "20px",
}));


const MessageContent = styled(Box)(({ owner }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: owner ? "flex-end" : "flex-start",
  backgroundColor: owner ? "#0B93F6" : "#E5E5EA",
  borderRadius: "10px",
  padding: "10px",
  maxWidth: "60%", // Decreased message size
}));

const TimeStamp = styled(Typography)({
  fontSize: "0.6rem",
  color: "#777777",
});

const Message = ({ message }) => {
  const seconds = message.date.seconds;
  const nanoseconds = message.date.nanoseconds;
  const timestampInMilliseconds = (seconds * 1000) + (nanoseconds / 1000000);
  const date = new Date(timestampInMilliseconds);
  const { currentUser } = useContext(AuthContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isOwner = message.senderId === currentUser.uid;

  return (
    <MessageContainer ref={ref} owner={isOwner}>
      <MessageContent owner={isOwner}>
        <Typography variant="body2">{message.text}</Typography>
        {message.img && (
          <img height="50px" width="50px" src={message.img} alt="" />
        )}
        <TimeStamp>{moment(date).fromNow()}</TimeStamp>
      </MessageContent>
    </MessageContainer>
  );
};

export default Message;
