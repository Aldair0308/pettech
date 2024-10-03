// LoginScreen.tsx

import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { login } from "../api/auth"; // Importa la función de inicio de sesión desde tu API
import { useTheme } from "../hooks/useTheme"; // Importa el hook useTheme para utilizar el ThemeProvider
import RegisterScreen from "./RegisterScreen";

const LoginScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { theme } = useTheme(); // Obtiene el theme del ThemeProvider

  const handleLogin = async () => {
    try {
      // Llama a la función de inicio de sesión de tu API
      const response = await login({ email, password });
      // Maneja la respuesta de la API
      signIn(response); // Envía los datos de inicio de sesión al contexto de autenticación
    } catch (error) {
      // Maneja los errores de inicio de sesión
      setError(
        "Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./../../assets/Header.jpg")}
        style={styles.headerImage}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <View style={{ flexDirection: "row", marginBottom: 30 }}>
          <Text style={styles.registerText}> No tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerText}>Registrate</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "80%" }}>
          <Text style={styles.promtText}> Ingresa tu correo</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
        <View style={{ width: "80%" }}>
          <Text style={styles.promtText}> Ingresa tu contraseña</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require("./../../assets/Footer.jpg")}
        style={styles.footerImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  registerText: {
    fontSize: 15,
    color: "#5d73c4",
    marginBottom: 28,
  },
  promtText: {
    fontSize: 15,
    color: "gray",
    marginBottom: 3,
  },
  headerImage: {
    width: "100%",
    height: 200,
  },
  footerImage: {
    width: "100%",
    height: 100,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 44,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#8396dc",
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 50,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderColor: "gray",
    borderWidth: 2,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    width: 200,
    height: 60,
    backgroundColor: "#6a7dc5",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 29,
  },
  buttonText: {
    color: "white",
    fontSize: 26,
  },
});

export default LoginScreen;
