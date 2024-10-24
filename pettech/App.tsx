import React from "react";
import { SafeAreaView, StyleSheet } from "react-native"; // Importa StyleSheet
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar"; // Importa StatusBar
import { ThemeProvider } from "./src/hooks/ThemeProvider";
import { AuthProvider } from "./src/context/AuthContext";
import MainStackNavigator from "./src/navigation/StackNavigator";

export default function App() {
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

// Este componente no se usa, así que lo puedes eliminar si no es necesario
const AppState = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
