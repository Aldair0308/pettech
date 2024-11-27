import React from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { Picker } from "@react-native-picker/picker";
import styles from "./../themes/petStyles";
import styles1 from "../themes/registroStyles";
import { usePets } from "../hooks/usePets";

const PetsScreen = ({ navigation }) => {
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
    selectedMinute,
    selectedTime,
    porcion,
    handleVecesChange,
    handleHourSelect,
    handleMinuteSelect,
    handleHourMinuteSelect,
    handleUpdate,
  } = usePets();

  const { theme } = useTheme();

  return (
    <View>
      <View style={styles.content}>
        <Text style={{ ...styles.title, marginBottom: -15, marginTop: -20 }}>
          modifica el perfil
        </Text>
        <Text style={styles.title}>de tu mascota</Text>
        <Text style={styles.promtText}>Ingresa el nombre de tu mascota</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de tu mascota"
          onChangeText={setName}
          value={name}
        />
        <Text style={styles.promtText}>Ingresa el tamaño de tu mascota</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={categoria}
            style={styles.picker}
            onValueChange={(itemValue) => setCategoria(itemValue)}
          >
            <Picker.Item label="Selecciona un tamaño" value="" />
            <Picker.Item label="Pequeño" value="pequeño" />
            <Picker.Item label="Mediano" value="mediano" />
            <Picker.Item label="Grande" value="grande" />
          </Picker>
        </View>
        <Text style={styles.promtText}>Ingresa la raza de tu mascota</Text>
        <TextInput
          style={styles.input}
          placeholder="Raza de tu mascota"
          onChangeText={setRaza}
          value={raza}
        />
        {/* <Text style={styles.promtText}>Ingresa la edad de tu mascota</Text>
        <TextInput
          style={styles.input}
          placeholder="Edad de tu mascota"
          onChangeText={setEdad}
          value={edad}
        /> */}
        <View
          style={{ flexDirection: "row", padding: 10, alignItems: "center" }}
        >
          <View style={{ width: "48%", marginRight: 10 }}>
            <Text style={{ ...styles.promtText, marginLeft: 12 }}>
              selecciona los gramos
            </Text>
            <TextInput
              style={[styles.input, { width: "100%", height: 38 }]}
              placeholder="Gramos por día"
              onChangeText={setGramos}
              value={gramos}
            />
          </View>
          <View style={{ width: "48%" }}>
            <Text style={{ ...styles.promtText, fontSize: 10 }}>
              veces al día
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
        <Text style={styles.promtText}>Selecciona el horario</Text>
        <View style={styles.horas}>
          {horas.map((hora, index) => (
            <TouchableOpacity
              style={styles.item}
              key={index}
              onPress={() => {
                setSelectedHourIndex(index);
                setModalVisible(true);
              }}
            >
              <Text style={styles.promtText2}>{hora || "Selecciona hora"}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles1.modalContainer}>
            <View style={styles1.card}>
              <Text style={styles1.modalTitle}>
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

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => setModalVisible2(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText2}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible2(false)}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PetsScreen;
