import { useState, useEffect } from "react";
import { Platform, Alert } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importar AsyncStorage

// messages.ts (o directamente en el archivo del hook)
export const messages = {
  paymentReminder: "El alimento ha sido dispensado",
  energyReminder: "El alimentador ha sido desconectado de la fuente de energía",
  serviceAlert: "Está por terminarse el alimento almacenado",
  feedbackRequest: "Problemas con el alimentador? Contáctenos",
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

type NotificationHookResult = {
  expoPushToken: string | null;
};

const useNotification = (): NotificationHookResult => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  // Función para guardar el token en AsyncStorage
  const savePushTokenToStorage = async (token: string) => {
    try {
      await AsyncStorage.setItem("expoPushToken", token); // Guardamos el token
      console.log("Push token guardado en AsyncStorage:", token);
    } catch (error) {
      console.error("Error guardando el token en AsyncStorage", error);
    }
  };

  // Función para recuperar el token desde AsyncStorage
  const getPushTokenFromStorage = async () => {
    try {
      const savedToken = await AsyncStorage.getItem("expoPushToken");
      if (savedToken) {
        console.log("Token recuperado de AsyncStorage:", savedToken);
        setExpoPushToken(savedToken);
      }
    } catch (error) {
      console.error("Error recuperando el token desde AsyncStorage", error);
    }
  };

  // Función para recuperar el userId desde AsyncStorage
  const getUserIdFromStorage = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        throw new Error("No se ha encontrado el userId en AsyncStorage.");
      }
      return userId;
    } catch (error) {
      console.error("Error recuperando el userId desde AsyncStorage", error);
      throw error;
    }
  };

  // Función para enviar el token a la API
  const sendPushTokenToApi = async (pushToken: string) => {
    try {
      const userId = await getUserIdFromStorage(); // Recuperamos el userId
      const apiUrl = `http://192.168.100.169:3000/users/id/${userId}`; // URL de la API
      const jsonPayload = {
        pushToken: pushToken, // Mandamos solo el pushToken
      };

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonPayload),
      });

      if (response.ok) {
        console.log("Push token enviado correctamente a la API.");
      } else {
        console.error(
          "Error al enviar el token a la API",
          await response.text()
        );
      }
    } catch (error) {
      console.error("Error al enviar el token a la API", error);
    }
  };

  useEffect(() => {
    // Recupera el token guardado al inicio si existe
    getPushTokenFromStorage();

    const registerForPushNotificationsAsync = async (): Promise<void> => {
      try {
        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C", // Color de la luz en Android
          });
        }

        if (Device.isDevice) {
          const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== "granted") {
            Alert.alert("Failed to get push token for push notification!");
            throw new Error("Failed to get push token for push notification!");
          }

          const expoPushTokenResponse =
            await Notifications.getExpoPushTokenAsync({
              projectId: Constants.expoConfig?.extra?.eas?.projectId || "",
            });

          if (expoPushTokenResponse.data) {
            setExpoPushToken(expoPushTokenResponse.data);
            // Guarda el token en AsyncStorage
            savePushTokenToStorage(expoPushTokenResponse.data);
            // Enviar el token a la API
            sendPushTokenToApi(expoPushTokenResponse.data);
          } else {
            console.warn("No token received.");
          }
        } else {
          Alert.alert("Must use a physical device for Push Notifications");
          throw new Error("Must use a physical device for Push Notifications");
        }
      } catch (error) {
        Alert.alert("Error", "No se pudo obtener el token de notificación.");
        console.error("Error getting Expo Push Token:", error);
      }
    };

    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const { messageType } = response.notification.request.content.data;
        const message = messages[messageType] || "Mensaje predeterminado";
        Alert.alert("Notificación", message); // Solo muestra el mensaje
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const sendPushNotification = async () => {
    if (!expoPushToken) {
      Alert.alert("Error", "No se ha recibido el token de notificación.");
      return;
    }

    const message = messages.paymentReminder; // Primer mensaje a enviar

    const messagePayload = {
      to: expoPushToken,
      sound: "default",
      title: "Alimento dispensado", // Título de la notificación
      body: message,
      data: {
        messageType: "paymentReminder", // Especificar el tipo de mensaje
      },
      android: {
        icon: "./assets/icon.png", // Icono personalizado para la notificación en Android
        color: "#FF231F7C", // Color de la notificación en Android
      },
      ios: {
        icon: "./assets/icon.png", // Icono personalizado para la notificación en iOS
      },
    };

    try {
      // Enviar la notificación a la Expo Push API
      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messagePayload),
      });

      const responseJson = await response.json();
      if (responseJson.data) {
        Alert.alert(
          "Notificación enviada",
          "La notificación fue enviada correctamente."
        );
      } else {
        throw new Error("Error al enviar la notificación.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema enviando la notificación.");
      console.error(error);
    }
  };

  return { expoPushToken, sendPushNotification };
};

export default useNotification;
