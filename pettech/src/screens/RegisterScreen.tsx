import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from "react-native";
import { AuthContext } from "../context/AuthContext"; // Asegúrate de que la ruta sea correcta

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { signIn } = useContext(AuthContext); // Accede a la función signIn

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setModalMessage("Las contraseñas no coinciden.");
      setModalVisible(true);
      return;
    }

    try {
      const response = await fetch("http:192.168.100.169:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setModalMessage("Usuario creado exitosamente");
        setModalVisible(true);

        // Llama a signIn con los datos del usuario
        signIn({
          accessToken: "", // Si no tienes un token, puedes dejarlo vacío
          user: {
            _id: data._id,
            email: data.email,
            photo: data.photo,
            rol: data.rol,
            name: data.name,
          },
        });

        setTimeout(() => {
          navigation.navigate("Registro"); // Navegar a la pantalla de login
        }, 2000);
      } else {
        setModalMessage(data.message || "Error al crear usuario");
        setModalVisible(true);
      }
    } catch (error) {
      setModalMessage(
        "Hubo un error al registrarse. Por favor, inténtalo de nuevo."
      );
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./../../assets/Header.jpg")}
        style={styles.headerImage}
      />
      <View style={styles.content}>
        <Text style={{ ...styles.title, marginBottom: -10 }}>Crea tu</Text>
        <Text style={styles.title}>cuenta</Text>
        <View style={{ flexDirection: "row", marginBottom: 30 }}>
          <Text style={styles.registerText}> Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("App")}>
            <Text style={styles.registerText}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "80%" }}>
          <Text style={styles.promtText}> Ingresa tu nombre</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          onChangeText={(text) => setName(text)}
          value={name}
        />
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
        <View style={{ width: "80%" }}>
          <Text style={styles.promtText}> Confirma tu contraseña</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Confirmar Contraseña"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}> SIGN UP</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require("./../../assets/Footer.jpg")}
        style={styles.footerImage}
      />

      {/* Modal para alertas */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: -3,
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
    marginBottom: 12,
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
    marginTop: 9,
  },
  buttonText: {
    color: "white",
    fontSize: 26,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#6a7dc5",
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default RegisterScreen;
