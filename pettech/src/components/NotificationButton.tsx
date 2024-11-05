import React from "react";
import { Button, Alert } from "react-native"; // Importa Button y Alert de react-native
import * as Notifications from "expo-notifications";
import { messages } from "../hooks/useNotifications"; // Importa los mensajes

type NotificationButtonProps = {
  expoPushToken: string | null; // Recibe el token de Expo
};

const NotificationButton: React.FC<NotificationButtonProps> = ({
  expoPushToken,
}) => {
  // Esta función enviará la notificación al token proporcionado
  const sendPushNotification = async () => {
    if (!expoPushToken) {
      Alert.alert("Error", "No se ha recibido el token de notificación.");
      return;
    }

    const message = messages.paymentReminder; // Primer mensaje a enviar

    const messagePayload = {
      to: expoPushToken,
      sound: "default",
      title: "Recordatorio de pago",
      body: message,
      data: { messageType: "paymentReminder" }, // Datos personalizados para identificar el tipo de mensaje
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

  return (
    // El botón debería recibir un texto dentro de la propiedad 'title'
    <Button title="Enviar Notificación" onPress={sendPushNotification} />
  );
};

export default NotificationButton;
