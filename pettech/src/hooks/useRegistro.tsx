// useRegistro.tsx
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export const useRegistro = () => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [categoria, setCategoria] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("");
  const [gramos, setGramos] = useState("");
  const [veces, setVeces] = useState("");
  const [horas, setHoras] = useState([]); // Inicializar un array vacío para las horas
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedHourIndex, setSelectedHourIndex] = useState(null);
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");
  const [porcion, setPorcion] = useState(0); // Nuevo estado para la porción
  const [dispenserCode, setDispenserCode] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    // Obtener el código del dispensador de AsyncStorage
    const fetchDispenserCode = async () => {
      const code = await AsyncStorage.getItem("dispenserCode");
      if (code) {
        setDispenserCode(code);

        // Verificar si ya hay una mascota registrada con este código
        try {
          const response = await fetch(
            `https://alimentador-production-15ae.up.railway.app/pets/code/${code}`
          );
          if (response.ok) {
            const pet = await response.json();
            if (pet) {
              setModalMessage(
                "Ya hay una mascota registrada para este dispensador."
              );
              setModalVisible2(true);
              setTimeout(() => {
                navigation.navigate("App");
              }, 2000);
            }
          }
        } catch (error) {
          console.error("Error al verificar el código del dispensador:", error);
        }
      }
    };
    fetchDispenserCode();
  }, []);

  useEffect(() => {
    // Calcular la porción cada vez que gramos o veces cambien
    if (gramos && veces) {
      const gramosInt = parseInt(gramos);
      const vecesInt = parseInt(veces);
      if (vecesInt > 0) {
        setPorcion(Math.floor(gramosInt / vecesInt)); // Calcula la porción entera
      } else {
        setPorcion(0); // Si veces es 0, la porción es 0
      }
    } else {
      setPorcion(0); // Reiniciar porción si gramos o veces son vacíos
    }
  }, [gramos, veces]);

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "https://alimentador-production-15ae.up.railway.app/pets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: name,
            raza: raza,
            categoria: categoria,
            gramos: parseInt(gramos),
            veces: parseInt(veces),
            porcion: porcion, // Valor fijo o dinámico según tu lógica
            horas: horas, // Aquí se envían las horas en el formato correcto
            edad: edad,
            code: dispenserCode, // Agregar el código del dispensador
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setModalMessage("Mascota registrada exitosamente");
        setModalVisible2(true);
        setTimeout(() => {
          navigation.navigate("App");
        }, 2000);
      } else {
        setModalMessage(data.message || "Error al registrar mascota");
        setModalVisible2(true);
      }
    } catch (error) {
      setModalMessage(
        "Hubo un error al registrar la mascota. Inténtalo de nuevo."
      );
      setModalVisible2(true);
    }
  };

  const handleVecesChange = (text) => {
    const value = parseInt(text);
    setVeces(value);
    if (value > 0) {
      setHoras(Array(value).fill("")); // Inicializa el array de horas
    } else {
      setHoras([]); // Si `veces` es 0, restablece `horas` a un array vacío
    }
  };

  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
    const formattedMinute =
      selectedMinute < 10 ? `0${selectedMinute}` : `${selectedMinute}`;
    setSelectedTime(`${formattedHour}:${formattedMinute}`);
  };

  const handleMinuteSelect = (minute) => {
    setSelectedMinute(minute);
    const formattedHour =
      selectedHour < 10 ? `0${selectedHour}` : `${selectedHour}`;
    const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
    setSelectedTime(`${formattedHour}:${formattedMinute}`);
  };

  const handleHourMinuteSelect = () => {
    if (selectedHour !== null && selectedMinute !== null) {
      const newTime = selectedTime; // Usamos el tiempo formateado
      const newHoras = [...horas];
      newHoras[selectedHourIndex] = newTime; // Actualiza el tiempo en el índice correspondiente
      setHoras(newHoras);
      setModalVisible(false); // Cierra el modal
    }
  };

  return {
    name,
    setName,
    categoria,
    setCategoria,
    raza,
    setRaza,
    edad,
    setEdad,
    gramos,
    setGramos,
    veces,
    setVeces,
    horas,
    setHoras,
    modalVisible,
    setModalVisible,
    modalVisible2,
    setModalVisible2,
    modalMessage,
    setModalMessage,
    selectedHourIndex,
    setSelectedHourIndex,
    selectedHour,
    setSelectedHour,
    selectedMinute,
    setSelectedMinute,
    selectedTime,
    setSelectedTime,
    porcion,
    handleRegister,
    handleVecesChange,
    handleHourSelect,
    handleMinuteSelect,
    handleHourMinuteSelect,
  };
};
