import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../hooks/useTheme";
import styles from "./../themes/petStyles"; // Asegúrate de que la ruta sea correcta
import { useUserHook } from "../hooks/useUserHook";

const PerfilForm: React.FC = () => {
  const { theme } = useTheme();
  const { user, fetchUserData } = useUserHook();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const updateUser = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");

      // Primero actualiza la información básica
      const response = await fetch(
        `http://192.168.100.169:3000/users/id/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
          }),
        }
      );

      if (!response.ok) {
        Alert.alert("Error al actualizar la información básica.");
        return;
      }

      // Luego, cambia la contraseña si se proporciona
      if (oldPassword || newPassword) {
        const passwordResponse = await fetch(
          `http://192.168.100.169:3000/users/change-password/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              oldPassword,
              newPassword,
            }),
          }
        );

        if (!passwordResponse.ok) {
          Alert.alert("Error al cambiar la contraseña.");
          return;
        }
      }

      Alert.alert("Información actualizada exitosamente");
      fetchUserData(); // Refresca los datos del usuario
    } catch (error) {
      console.error("Error al actualizar la información del usuario:", error);
      Alert.alert(
        "Error al actualizar la información. Inténtalo de nuevo más tarde."
      );
    }
  };

  return (
    <View style={[theme.styles.container, styles.container]}>
      <Text style={{ ...styles.title, marginBottom: 80 }}>Edita tu Perfil</Text>
      <Text style={styles.promtText}>Ingresa tu nombre</Text>
      <TextInput
        style={[styles.input, { width: 280 }]} // Ajuste del ancho
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.promtText}>Ingresa tu correo</Text>
      <TextInput
        style={[styles.input, { width: 280 }]} // Ajuste del ancho
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={styles.promtText}>Contraseña anterior</Text>

      <TextInput
        style={[styles.input, { width: 280 }]} // Ajuste del ancho
        placeholder="Contraseña Anterior"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
      />
      <Text style={styles.promtText}>Contraseña nueva</Text>
      <TextInput
        style={[styles.input, { width: 280 }]} // Ajuste del ancho
        placeholder="Nueva Contraseña"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={{ ...styles.button, marginTop: 50 }}
        onPress={updateUser}
      >
        <Text style={styles.buttonText}>EDITAR</Text>
      </TouchableOpacity>

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

export default PerfilForm;
