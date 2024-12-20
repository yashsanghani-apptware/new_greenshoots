import axios from "axios";
import config from "../config";

interface NotificationData {
  // Define the properties of notificationData here
  title: string;
  message: string;
}

export const sendNotification = async (
  notificationData: NotificationData
): Promise<void> => {
  try {
    await axios.post(
      `${config.notificationServiceURL}/notify`,
      notificationData
    );
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
};
