import { showNotification } from "@mantine/notifications";
import React from "react";
import { Check, X } from "tabler-icons-react";

export const ICON_STROKE_WIDTH = 1;

export const notificationBase = props => {
  showNotification({
    ...props,
  });
};

export const Notifications = {
  success: (message, options) => {
    notificationBase({
      ...options,
      message,
      color: "green",
      icon: <Check strokeWidth={ICON_STROKE_WIDTH} color="green" />,
    });
  },
  error: (message, options) => {
    notificationBase({
      ...options,
      message,
      color: "red",
      icon: <X strokeWidth={ICON_STROKE_WIDTH} color="red" />,
    });
  },
};

export default Notifications;
