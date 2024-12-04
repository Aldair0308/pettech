import { useState, useEffect } from "react";
import { Platform, Alert } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  sendPushNotification: () => Promise<void>;
};

const useNotification = (): NotificationHookResult => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  // Función segura para guardar en AsyncStorage
  const safeSetItem = async (key: string, value: string | null | undefined) => {
    try {
      if (value === undefined || value === null) {
        console.warn(
          `No se puede guardar un valor nulo o indefinido. Clave: ${key}`
        );
        return;
      }
      await AsyncStorage.setItem(key, value);
      console.log(`Guardado en AsyncStorage: ${key} = ${value}`);
    } catch (error) {
      console.error(`Error guardando ${key}:`, error);
    }
  };

  // Función para guardar el token en AsyncStorage
  const savePushTokenToStorage = async (token: string) => {
    await safeSetItem("expoPushToken", token);
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

  // Función para recuperar el userId desde AsyncStorage con reintentos
  const getUserIdWithRetries = async (
    maxRetries = 10,
    delay = 500
  ): Promise<string> => {
    let retries = 0;

    while (retries < maxRetries) {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          console.log("UserId encontrado:", userId);
          return userId;
        }
      } catch (error) {
        console.error("Error recuperando el userId desde AsyncStorage", error);
      }

      retries++;
      console.log(`Reintentando obtener userId... (${retries}/${maxRetries})`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    throw new Error("No se encontró el userId después de múltiples intentos.");
  };

  // Función para enviar el token a la API
  const sendPushTokenToApi = async (pushToken: string) => {
    try {
      const userId = await getUserIdWithRetries();
      const apiUrl = `https://alimentador-production-15ae.up.railway.app/users/id/${userId}`;
      const jsonPayload = { pushToken };

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
    getPushTokenFromStorage();

    const registerForPushNotificationsAsync = async (): Promise<void> => {
      try {
        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
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
            return;
          }

          const tokenResponse = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig?.extra?.eas?.projectId || "",
          });

          if (tokenResponse.data) {
            setExpoPushToken(tokenResponse.data);
            await savePushTokenToStorage(tokenResponse.data);
            await sendPushTokenToApi(tokenResponse.data);
          }
        } else {
          Alert.alert(
            "Debe usar un dispositivo físico para las notificaciones push."
          );
        }
      } catch (error) {
        console.error("Error obteniendo el token de notificación:", error);
      }
    };

    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const { messageType } = response.notification.request.content.data;
        const message = messages[messageType] || "Mensaje predeterminado";
        Alert.alert("Notificación", message);
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

    const message = messages.paymentReminder;

    const payload = {
      to: expoPushToken,
      sound: "default",
      title: "Alimento dispensado",
      body: message,
      data: { messageType: "paymentReminder" },
    };

    try {
      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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
