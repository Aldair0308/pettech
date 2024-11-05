import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "./src/hooks/ThemeProvider";
import { AuthProvider } from "./src/context/AuthContext";
import MainStackNavigator from "./src/navigation/StackNavigator";
import useNotification from "./src/hooks/useNotifications"; // Importa el hook useNotification

export default function App() {
  const { expoPushToken } = useNotification(); // Usamos el hook para gestionar las notificaciones
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (expoPushToken) {
      console.log("Token de Push:", expoPushToken); // Imprime el token si se obtiene correctamente
      setToken(expoPushToken); // Guardamos el token para usarlo en el botón
    }
  }, [expoPushToken]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <AuthProvider>
          <ThemeProvider>
            <MainStackNavigator />
          </ThemeProvider>
        </AuthProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight, // Añade espacio para la barra de estado
  },
});
