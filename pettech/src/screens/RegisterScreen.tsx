import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { useRegister } from "../hooks/useRegister";
import useValidation from "../hooks/useValidation";
import styles from "./../themes/registroStyles";

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
    modalVisible,
    setModalVisible,
    modalMessage,
    setModalMessage,
    handleDispenserCodeSubmit,
    wifiModalVisible,
    handleWifiSubmit,
    setDispenserModalVisible,
    dispenserModalVisible,
  } = useRegister();

  const { errors, validateForm } = useValidation();

  const handleRegisterWithValidation = () => {
    const isValid = validateForm({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!isValid) {
      setModalMessage("Por favor, corrige los errores del formulario.");
      setModalVisible(true);
      return;
    }

    setDispenserModalVisible(true);
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
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
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
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
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
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
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
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegisterWithValidation}
        >
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
          <View style={styles.modalContainer2}>
            <Text style={styles.modalText2}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton2}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText2}>Cerrar</Text>
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
          <View style={styles.modalContainer2}>
            <Text style={styles.modalText2}>
              Ingresa el código del dispensador
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Código del dispensador"
              onChangeText={(text) => setDispenserCode(text)}
              value={dispenserCode}
            />
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                style={styles.modalButton2}
                onPress={handleDispenserCodeSubmit}
              >
                <Text style={styles.modalButtonText2}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setDispenserModalVisible(false)}
              >
                <Text style={styles.modalButtonText2}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para configurar WiFi */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={wifiModalVisible}
        onRequestClose={() => setWifiModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer2}>
            <Text style={styles.modalText2}>
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
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                style={styles.modalButton2}
                onPress={handleWifiSubmit}
              >
                <Text style={styles.modalButtonText2}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setWifiModalVisible(false)}
              >
                <Text style={styles.modalButtonText2}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RegisterScreen;
