import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dispenserCode, setDispenserCode] = useState("");
  const [wifiName, setWifiName] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [dispenserModalVisible, setDispenserModalVisible] = useState(false);
  const [wifiModalVisible, setWifiModalVisible] = useState(false);
  const navigation = useNavigation();
  const { signIn } = useContext(AuthContext);

  // Validar el registro inicial
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setModalMessage("Las contraseñas no coinciden.");
      setModalVisible(true);
      return;
    }

    setDispenserModalVisible(true);
  };

  // Cerrar modal del dispensador
  const closeDispenserModal = () => {
    setDispenserModalVisible(false);
  };

  // Cerrar modal del WiFi
  const closeWifiModal = () => {
    setWifiModalVisible(false);
  };

  // Enviar el código del dispensador
  const handleDispenserCodeSubmit = async () => {
    try {
      const dispenserResponse = await fetch(
        `https://alimentador-production-15ae.up.railway.app/dispenser/code/${dispenserCode}`
      );
      const dispenser = await dispenserResponse.json();

      if (!dispenser || dispenser.error) {
        setModalMessage(
          "No se encontró ningún dispensador con ese código. Por favor, intenta de nuevo."
        );
        setModalVisible(true);
        setDispenserModalVisible(true);
        return;
      }

      if (!dispenser.wifi || !dispenser.password) {
        setWifiModalVisible(true);
        setDispenserModalVisible(false);
      } else {
        await registerUser();
      }
    } catch (error) {
      setModalMessage(
        "Hubo un error al verificar el dispensador. Por favor, inténtalo de nuevo."
      );
      setModalVisible(true);
      setDispenserModalVisible(true);
    }
  };

  // Registrar el usuario
  const registerUser = async () => {
    try {
      const response = await fetch(
        "https://alimentador-production-15ae.up.railway.app/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, code: dispenserCode }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setModalMessage("Usuario creado exitosamente");
        setModalVisible(true);
        setDispenserModalVisible(false);

        // Guardar los datos del usuario en AsyncStorage
        await AsyncStorage.setItem("userId", data._id);
        await AsyncStorage.setItem("userEmail", data.email);
        await AsyncStorage.setItem("userPhoto", data.photo);
        await AsyncStorage.setItem("userName", data.name);
        await AsyncStorage.setItem("dispenserCode", data.code);

        // Llamar a signIn con los datos del usuario
        signIn({
          accessToken: "",
          user: {
            _id: data._id,
            email: data.email,
            photo: data.photo,
            rol: data.rol || "",
            name: data.name,
            code: data.code,
          },
        });

        setTimeout(() => {
          navigation.navigate("Registro");
        }, 2000);
      } else {
        setModalMessage(data.message || "Error al crear usuario");
        setModalVisible(true);
        setDispenserModalVisible(true);
      }
    } catch (error) {
      setModalMessage(
        "Hubo un error al registrarse. Por favor, inténtalo de nuevo."
      );
      setModalVisible(true);
      setDispenserModalVisible(true);
    }
  };

  // Configurar WiFi
  const handleWifiSubmit = async () => {
    try {
      // Obtener el código del dispensador desde AsyncStorage
      const savedCode = await AsyncStorage.getItem("dispenserCode");
      if (!savedCode) {
        setModalMessage("No se encontró un código de dispensador guardado.");
        setModalVisible(true);
        return;
      }

      // Buscar el dispensador usando el código
      const dispenserResponse = await fetch(
        `https://alimentador-production-15ae.up.railway.app/dispenser/code/${savedCode}`
      );
      const dispenser = await dispenserResponse.json();

      if (!dispenser || dispenser.error) {
        setModalMessage("No se encontró un dispensador con ese código.");
        setModalVisible(true);
        return;
      }

      // Hacer un PUT para actualizar los datos del WiFi
      const response = await fetch(
        `https://alimentador-production-15ae.up.railway.app/dispenser/${dispenser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ wifi: wifiName, password: wifiPassword }),
        }
      );

      if (response.ok) {
        setModalMessage("WiFi configurado exitosamente.");
        setModalVisible(true);
        setWifiModalVisible(false);
      } else {
        setModalMessage("Error al configurar el WiFi. Inténtalo de nuevo.");
        setModalVisible(true);
      }
    } catch (error) {
      setModalMessage(
        "Hubo un error al configurar el WiFi. Por favor, inténtalo de nuevo."
      );
      setModalVisible(true);
    }
  };

  return {
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
    setError,
    modalVisible,
    setModalVisible,
    modalMessage,
    setModalMessage,
    handleRegister,
    dispenserModalVisible,
    setDispenserModalVisible,
    closeDispenserModal,
    handleDispenserCodeSubmit,
    wifiModalVisible,
    setWifiModalVisible,
    closeWifiModal,
    handleWifiSubmit,
    registerUser,
  };
};
