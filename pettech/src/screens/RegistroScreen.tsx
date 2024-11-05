import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { useTheme } from "../hooks/useTheme"; // Importa el hook useTheme
import { Picker } from "@react-native-picker/picker"; // Importa el Picker
import styles from "./../themes/registroStyles";

const RegistroScreen = ({ navigation }) => {
  const [error, setError] = useState(""); // Añade esta línea al inicio de tu componente
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

  const { theme } = useTheme();

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
      const response = await fetch("http:192.168.100.169:3000/pets", {
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
        }),
      });

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

  return (
    <View style={styles.container}>
      <Image
        source={require("./../../assets/Header.jpg")}
        style={styles.headerImage}
      />
      <View style={styles.content}>
        <Text style={{ ...styles.title, marginBottom: -15, marginTop: -20 }}>
          crea el perfil de
        </Text>
        <Text style={styles.title}>tu mascota</Text>
        <View style={{ width: "80%" }}>
          <Text style={{ ...styles.promtText, marginTop: -5 }}>
            Ingresa el nombre de tu mascota
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Nombre de tu mascota"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <View style={{ width: "80%" }}>
          <Text style={styles.promtText}>
            {" "}
            selecciona el tamaño de tu mascota
          </Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={categoria}
            style={styles.picker} // Aplica el estilo aquí
            onValueChange={(itemValue) => setCategoria(itemValue)}
          >
            <Picker.Item label="Selecciona un tamaño" value="" />
            <Picker.Item label="Pequeño" value="pequeño" />
            <Picker.Item label="Mediano" value="mediano" />
            <Picker.Item label="Grande" value="grande" />
          </Picker>
        </View>

        <View style={{ width: "80%" }}>
          <Text style={styles.promtText}>selecciona la raza de tu mascota</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Raza de tu mascota"
          onChangeText={(text) => setRaza(text)}
          value={raza}
        />
        <View style={{ width: "80%" }}>
          <Text style={styles.promtText}>
            selecciona la edad de tu mascota{" "}
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Edad de tu mascota"
          onChangeText={(text) => setEdad(text)}
          value={edad}
        />
        <Text style={styles.registerText}>
          {" "}
          Configura su horario de alimentacion{" "}
        </Text>
        <View style={{ flexDirection: "row", padding: 10 }}>
          <View style={{ width: "45%", marginRight: 10 }}>
            <Text style={styles.promtText}>selecciona los gramos</Text>
            <TextInput
              style={[styles.input, { width: "100%", height: 38 }]}
              placeholder="Gramos por dia"
              onChangeText={(text) => setGramos(text)}
              value={gramos}
            />
          </View>
          <View style={{ width: "45%" }}>
            <Text style={{ ...styles.promtText, fontSize: 10 }}>
              selecciona las cantidades al día
            </Text>
            <View style={{ ...styles.pickerContainer, height: 38 }}>
              <Picker
                selectedValue={veces.toString()}
                style={[styles.picker, { width: "100%", height: 38 }]}
                onValueChange={(itemValue) => handleVecesChange(itemValue)}
              >
                <Picker.Item label="Selecciona veces por día" value="" />
                {[1, 2, 3, 4].map((num) => (
                  <Picker.Item
                    key={num}
                    label={num.toString()}
                    value={num.toString()}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        <View style={{ width: "80%", marginTop: -10 }}>
          <Text style={styles.promtText}> Selecciona el horario</Text>
        </View>
        <View style={styles.horas}>
          {horas.map((hora, index) => (
            <TouchableOpacity
              style={styles.item} // Aplica el estilo aquí
              key={index}
              onPress={() => {
                setSelectedHourIndex(index);
                setModalVisible(true); // Abre el modal para seleccionar hora y minuto
              }}
            >
              <Text style={styles.promtText}>{hora || "Selecciona hora"}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Modal para seleccionar hora y minuto */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.card}>
              <Text style={styles.modalTitle}>
                Selecciona la hora y minuto:
              </Text>

              <View style={styles.pickerContainer2}>
                <Text style={styles.label}>Selecciona la hora:</Text>
                <View style={styles.row}>
                  {Array.from({ length: 24 }, (_, hour) => (
                    <TouchableOpacity
                      key={hour}
                      onPress={() => handleHourSelect(hour)}
                      style={styles.option}
                    >
                      <Text style={styles.optionText}>
                        {hour < 10 ? `0${hour}` : hour}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.pickerContainer2}>
                <Text style={styles.label}>Selecciona los minutos:</Text>
                <View style={styles.row}>
                  {[0, 15, 30, 45].map((minute) => (
                    <TouchableOpacity
                      key={minute}
                      onPress={() => handleMinuteSelect(minute)}
                      style={styles.option}
                    >
                      <Text style={styles.optionText}>
                        {minute < 10 ? `0${minute}` : minute}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <Text style={styles.selectedTimeText}>
                Hora seleccionada: {selectedTime}
              </Text>

              <TouchableOpacity
                onPress={handleHourMinuteSelect}
                style={styles.confirmButton}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}> SIGN UP</Text>
        </TouchableOpacity>
      </View>
      {/* Modal para alertas */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => setModalVisible2(false)}
      >
        <View style={styles.modalBackground2}>
          <View style={styles.modalContainer2}>
            <Text style={styles.modalText2}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton2}
              onPress={() => setModalVisible2(false)}
            >
              <Text style={styles.modalButtonText2}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RegistroScreen;
