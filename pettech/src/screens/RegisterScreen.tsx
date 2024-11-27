// RegisterScreen.tsx
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from "react-native";
import { useRegister } from "../hooks/useRegister";

const RegisterScreen = ({ navigation }) => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    dispenserCode,
    setDispenserCode,
    wifiName,
    setWifiName,
    wifiPassword,
    setWifiPassword,
    error,
    modalVisible,
    setModalVisible,
    modalMessage,
    handleRegister,
    dispenserModalVisible,
    handleDispenserCodeSubmit,
    setDispenserModalVisible,
    wifiModalVisible,
    handleWifiSubmit,
  } = useRegister();

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

      {/* Modal para el código del dispensador */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={dispenserModalVisible}
        onRequestClose={() => setDispenserModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Ingresa el código del dispensador
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Código del dispensador"
              onChangeText={(text) => setDispenserCode(text)}
              value={dispenserCode}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleDispenserCodeSubmit}
            >
              <Text style={styles.modalButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para configurar WiFi */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={wifiModalVisible}
        onRequestClose={() => setDispenserModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Configura el WiFi del dispensador
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre de la red WiFi"
              onChangeText={(text) => setWifiName(text)}
              value={wifiName}
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña del WiFi"
              secureTextEntry
              onChangeText={(text) => setWifiPassword(text)}
              value={wifiPassword}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleWifiSubmit}
            >
              <Text style={styles.modalButtonText}>Confirmar WiFi</Text>
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
