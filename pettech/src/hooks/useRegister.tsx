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

    setDispenserModalVisible(true);
  };

  const closeDispenserModal = () => {
    setDispenserModalVisible(false);
  };

  const closeWifiModal = () => {
    setWifiModalVisible(false);
  };

  const handleDispenserCodeSubmit = async () => {
    try {
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

  const handleWifiSubmit = async () => {
    try {
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
    closeWifiModal,
    handleWifiSubmit,
  };
};
