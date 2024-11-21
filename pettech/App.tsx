import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "./src/hooks/ThemeProvider";
import { AuthProvider } from "./src/context/AuthContext";
import MainStackNavigator from "./src/navigation/StackNavigator";
import InternetStatus from "./src/components/InternetStatus";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <AuthProvider>
          <ThemeProvider>
            <View style={styles.mainContent}>
              {/* Contenedor principal para la app */}
              <MainStackNavigator />
            </View>
            {/* Contenedor para el estado de la conexión */}
            <InternetStatus />
          </ThemeProvider>
        </AuthProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight, // Añade espacio para la barra de estado
  },
  mainContent: {
    flex: 9, // La parte principal ocupará 90% del espacio
  },
});
