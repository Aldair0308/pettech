// usePets.tsx
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const usePets = () => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [categoria, setCategoria] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("");
  const [gramos, setGramos] = useState("");
  const [veces, setVeces] = useState("");
  const [horas, setHoras] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedHourIndex, setSelectedHourIndex] = useState(null);
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");
  const [id, setId] = useState("");
  const [porcion, setPorcion] = useState(0); // Nuevo estado para la porción

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

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const code = await AsyncStorage.getItem("dispenserCode");
        if (code) {
          const response = await fetch(
            `http://192.168.100.169:3000/pets/last/${code}`
          );
          const data = await response.json();

          if (response.ok) {
            const { _id, nombre, raza, categoria, gramos, veces, horas, edad } =
              data;
            setName(nombre);
            setRaza(raza);
            setCategoria(categoria);
            setEdad(edad);
            setGramos(gramos.toString());
            setVeces(veces.toString());
            setHoras(horas);
            setId(_id);
          } else {
            setModalMessage(
              data.message || "Error al obtener datos de la mascota"
            );
            setModalVisible2(true);
          }
        }
      } catch (error) {
        setModalMessage("Hubo un error al cargar los datos de la mascota.");
        setModalVisible2(true);
      }
    };
    fetchPetData();
  }, []);

  const handleUpdate = async () => {
    if (
      !name ||
      !raza ||
      !categoria ||
      !edad ||
      !gramos ||
      !veces ||
      horas.length === 0
    ) {
      setModalMessage("Por favor completa todos los campos.");
      setModalVisible2(true);
      return;
    }

    const validCategorias = ["pequeño", "mediano", "grande"];
    if (!validCategorias.includes(categoria)) {
      setModalMessage("La categoría seleccionada no es válida.");
      setModalVisible2(true);
      return;
    }

    const hourRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    for (let hora of horas) {
      if (!hourRegex.test(hora)) {
        setModalMessage("Una o más horas no son válidas.");
        setModalVisible2(true);
        return;
      }
    }

    try {
      const response = await fetch(`http://192.168.100.169:3000/pets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: name,
          raza: raza,
          categoria: categoria,
          gramos: parseInt(gramos),
          veces: parseInt(veces),
          porcion: porcion,
          horas: horas,
          edad: edad,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setModalMessage("Mascota actualizada exitosamente");
        setModalVisible2(true);
        setTimeout(() => {}, 2000);
      } else {
        setModalMessage(data.message || "Error al actualizar mascota");
        setModalVisible2(true);
      }
    } catch (error) {
      setModalMessage(
        "Hubo un error al actualizar la mascota. Inténtalo de nuevo."
      );
      setModalVisible2(true);
    }
  };

  const handleVecesChange = (text) => {
    const value = parseInt(text);
    setVeces(value);
    if (value > 0) {
      setHoras(Array(value).fill(""));
    } else {
      setHoras([]);
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
      const newTime = selectedTime;
      const newHoras = [...horas];
      newHoras[selectedHourIndex] = newTime;
      setHoras(newHoras);
      setModalVisible(false);
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
    id,
    porcion,
    handleUpdate,
    handleVecesChange,
    handleHourSelect,
    handleMinuteSelect,
    handleHourMinuteSelect,
  };
};
