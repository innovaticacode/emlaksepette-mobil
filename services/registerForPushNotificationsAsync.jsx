import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

/**
 * Registers the device for push notifications and retrieves an Expo Push Token.
 *
 * This function handles:
 * 1. Requesting permission from the user to allow notifications.
 * 2. Generating an Expo Push Token if permission is granted.
 * 3. Utilizing the project ID from the app's configuration (if available) to fetch the token.
 *
 * If the user denies notification permissions or an error occurs during the process,
 * the function gracefully handles the scenario and logs appropriate messages.
 *
 * @async
 * @function registerForPushNotificationsAsync
 * @returns {Promise<string|null>} Returns the Expo Push Token as a string if successful,
 *                                 or `null` if permission is denied or an error occurs.
 */
export async function registerForPushNotificationsAsync() {
  let token;

  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Notification permission not granted!");
      return null;
    }

    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId:
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId,
      })
    ).data;

    return token;
  } catch (error) {
    console.error("Error while retrieving push notification token:", error);
    return null;
  }
}
