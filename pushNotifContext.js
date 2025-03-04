
import React, { useEffect, useContext, createContext} from "react";
import { Platform } from "react-native";
import * as Notifications from 'expo-notifications';

// Set notification handler (optional, for foreground behavior)
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

export const PushNotificationContextStore = createContext();
export default function PushNotification(props){

 async function registerForPushNotificationsAsync() {
    try {
      // Request permission for notifications
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Failed to get push token: Permission denied');
        return;
      }

      // Get the Expo push token
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Expo Push Token:', token);

      // For Android, set up notification channel (required for Android 8.0+)
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      return token;
    } catch (error) {
      console.error('Error getting push token:', error);
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync();

    // Handle notifications received while app is in foreground
    const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received in foreground:', notification);
    });

    // Handle notification taps
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification tapped:', response);
    });

    // Cleanup subscriptions
    return () => {
      foregroundSubscription.remove();
      responseSubscription.remove();
    };
  }, []);


    return(
        <PushNotificationContextStore.Provider value={{
            registerForPushNotificationsAsync,
            // token: token // Use this token in your backend to send notifications

         // Add other context values as needed
        }}>
            {props.children}
        </PushNotificationContextStore.Provider>
    )

}