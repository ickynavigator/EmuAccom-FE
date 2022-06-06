import { showNotification } from "@mantine/notifications";
import React from "react";
import { Check, X } from "tabler-icons-react";

export const ICON_STROKE_WIDTH = 1;

export const notificationBase = props => {
  showNotification({
    id: props.id,
    disallowClose: props.disallowClose,
    onClose: e => (props.closeCB !== undefined ? props.closeCB(e) : () => {}),
    onOpen: e => (props.openCB !== undefined ? props.openCB(e) : () => {}),
    autoClose: props.autoClose,
    title: props.title,
    message: props.message,
    color: props.color,
    icon: props.icon,
    className: props.className,
    style: props.style,
    sx: props.sx,
    loading: props.loading,
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
