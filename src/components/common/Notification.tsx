import React from 'react';

interface NotificationProps {
  message: string;
}

const Notification = ({ message }: NotificationProps) => {
  return (
    <>
      <p className="text-red py-4">{message}</p>
    </>
  );
};

export default Notification;
