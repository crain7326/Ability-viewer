import React from "react";

interface INotificationProps {
  message: string;
}

const Notification = ({ message }: INotificationProps) => {
  return (
    <>
      <p>{message}</p>
    </>
  );
};

export default Notification;
