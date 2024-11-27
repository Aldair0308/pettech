// useRegister.tsx
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

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setModalMessage("Las contraseñas no coinciden.");
      setModalVisible(true);
      return;
    }

    // Mostrar el modal para ingresar el código del dispensador
    setDispenserModalVisible(true);
  };

  const handleDispenserCodeSubmit = async () => {
    try {
      // Verificar el código del dispensador
      const dispenserResponse = await fetch(
        `http://192.168.100.169:3000/dispenser/code/${dispenserCode}`
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

      // Si el dispensador no tiene configurado el WiFi, mostrar el modal para configurarlo
      if (!dispenser.wifi || !dispenser.password) {
        setWifiModalVisible(true);
        setDispenserModalVisible(false);
      } else {
        // Registrar al usuario si el dispensador es válido y tiene WiFi configurado
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

  const handleWifiSubmit = async () => {
    try {
      // Actualizar el dispensador con la información del WiFi
      const dispenserResponse = await fetch(
        `http://192.168.100.169:3000/dispenser/code/${dispenserCode}`
      );
      const dispenser = await dispenserResponse.json();

      const response = await fetch(
        `http://192.168.100.169:3000/dispenser/${dispenser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ wifi: wifiName, password: wifiPassword }),
        }
      );

      if (response.ok) {
        setModalMessage("WiFi configurado exitosamente");
        setModalVisible(true);
        setWifiModalVisible(false);
        // Registrar al usuario después de configurar el WiFi
        await registerUser();
      } else {
        setModalMessage(
          "Error al configurar el WiFi. Por favor, intenta de nuevo."
        );
        setModalVisible(true);
        setWifiModalVisible(true);
      }
    } catch (error) {
      setModalMessage(
        "Hubo un error al configurar el WiFi. Por favor, inténtalo de nuevo."
      );
      setModalVisible(true);
      setWifiModalVisible(true);
    }
  };

  const registerUser = async () => {
    try {
      const response = await fetch(
        "http://192.168.100.169:3000/auth/register",
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

        // Guardar el código del dispensador en AsyncStorage
        await AsyncStorage.setItem("dispenserCode", dispenserCode);

        signIn({
          accessToken: "",
          user: {
            _id: data._id,
            email: data.email,
            photo: data.photo,
            rol: data.rol,
            name: data.name,
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
    modalVisible,
    setModalVisible,
    modalMessage,
    handleRegister,
    dispenserModalVisible,
    setDispenserModalVisible,
    handleDispenserCodeSubmit,
    wifiModalVisible,
    handleWifiSubmit,
  };
};
