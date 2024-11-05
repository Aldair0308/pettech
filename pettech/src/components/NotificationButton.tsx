import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importar AsyncStorage
import { useNavigation } from "@react-navigation/native"; // Importar useNavigation
import { messages } from "../hooks/useNotifications"; // Importar los mensajes

const NotificationButton: React.FC = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null); // Estado para almacenar el token
  const navigation = useNavigation(); // Obtener el objeto de navegación

  // Función para obtener el token desde AsyncStorage
  const getPushTokenFromStorage = async () => {
    try {
      const token = await AsyncStorage.getItem("expoPushToken");
      if (token) {
        setExpoPushToken(token); // Guardar el token en el estado
        console.log("Token recuperado de AsyncStorage:", token);
      } else {
        console.warn("No se encontró el token en AsyncStorage.");
      }
    } catch (error) {
      console.error("Error recuperando el token desde AsyncStorage", error);
    }
  };

  useEffect(() => {
    getPushTokenFromStorage(); // Recuperamos el token cuando el componente se monta

    // Configurar listener para manejar la respuesta a la notificación
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // Si la notificación tiene datos específicos, como un tipo de mensaje
        const { messageType } = response.notification.request.content.data;
        if (messageType === "navigateToCamara") {
          // Navegar a la pantalla de la cámara
          navigation.navigate("Camara");
        }
      }
    );

    return () => {
      subscription.remove(); // Limpiar el listener cuando el componente se desmonte
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
      title: "Alimento dispensado",
      body: message,
      data: {
        messageType: "navigateToCamara", // Especificar el tipo de mensaje para la navegación
      },
      android: {
        icon: "https://your-app-url.com/assets/icons/notification-icon.png", // URL pública de tu ícono
        iconColor: "#FF231F7C", // Puedes establecer un color para el ícono en Android
      },
      ios: {
        icon: "https://your-app-url.com/assets/icons/notification-icon.png", // Icono para iOS
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
      } else {
        throw new Error("Error al enviar la notificación.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema enviando la notificación.");
      console.error(error);
    }
  };

  return <Button title="Enviar Notificación" onPress={sendPushNotification} />;
};

export default NotificationButton;
