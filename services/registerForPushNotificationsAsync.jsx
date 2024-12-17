import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

export async function registerForPushNotificationsAsync() {
  let token;

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Bildirim izni verilmedi!");
    return;
  }

  // Proje kimliği ile birlikte getExpoPushTokenAsync kullanın
  token = (
    await Notifications.getExpoPushTokenAsync({
      projectId:
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId,
    })
  ).data;

  return token;
}
