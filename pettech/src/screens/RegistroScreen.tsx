// RegistroScreen.tsx
import React from "react";
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
import { useRegistro } from "../hooks/useRegistro";

const RegistroScreen = ({ navigation }) => {
  const {
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
    modalVisible,
    setModalVisible,
    modalVisible2,
    setModalVisible2,
    modalMessage,
    selectedHourIndex,
    setSelectedHourIndex,
    selectedHour,
    selectedMinute,
    selectedTime,
    porcion,
    handleRegister,
    handleVecesChange,
    handleHourSelect,
    handleMinuteSelect,
    handleHourMinuteSelect,
  } = useRegistro();

  const { theme } = useTheme();

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
