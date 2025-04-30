import { Notification } from "electron";

type NotificationTypes = "keep-going" | "posture-alert";

export const sendNotification = (type: NotificationTypes) => {
  const notifications = {
    "keep-going": {
      title: "Keep up the good work!",
      body: "You're doing great! Keep it up!",
    },
    "posture-alert": {
      title: "Keep your posture straight",
      body: "You should keep your posture straight, otherwise you will be prone to injury.",
      icon: "./resources/logo.png",
    },
  };

  const content = notifications[type];

  if (!content) {
    throw new Error("Notification type not found");
  }

  const notification = new Notification(content);

  notification.show();
  setTimeout(() => {
    notification.close();
  }, 5000);
};
