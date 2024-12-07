import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import useCreateProblem from "./../hooks/useCreateProblem";

const CreateProblemModal: React.FC = () => {
  const { createProblemHandler, loading, error } = useCreateProblem();
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({
    problema: "",
    estado: "en revision",
    descripcion: "",
    categoria: "",
    responsable: "",
  });

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const userName = await AsyncStorage.getItem("userName");
        if (userName) {
          setForm((prev) => ({ ...prev, responsable: userName }));
        }
      } catch (err) {
        console.error("Error al cargar el nombre del usuario:", err);
      }
    };
    loadUserName();
  }, []);

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await createProblemHandler(form);
    setForm({
      problema: "",
      estado: "en revision",
      descripcion: "",
      categoria: "",
      responsable: form.responsable,
    });
    setModalVisible(false); // Cierra el modal tras el envío
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.createButtonText}>Crear Reporte</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <KeyboardAvoidingView behavior="padding" style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Reportar problema</Text>
              <Text style={styles.label}>Problema</Text>
              <TextInput
                style={styles.input}
                value={form.problema}
                onChangeText={(value) => handleChange("problema", value)}
                placeholder="Problema"
              />

              <Text style={styles.label}>Categoría</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={form.categoria}
                  style={styles.picker}
                  onValueChange={(itemValue) =>
                    handleChange("categoria", itemValue)
                  }
                >
                  <Picker.Item label="Selecciona una categoría" value="" />
                  <Picker.Item label="Alimentador" value="Alimentador" />
                  <Picker.Item label="Aplicación" value="Aplicación" />
                  <Picker.Item label="Otro" value="Otro" />
                </Picker>
              </View>

              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={styles.textArea}
                value={form.descripcion}
                onChangeText={(value) => handleChange("descripcion", value)}
                placeholder="Descripción"
                multiline
              />

              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitButtonText}>Crear Problema</Text>
                </TouchableOpacity>
              )}

              {error && <Text style={styles.error}>Error: {error}</Text>}

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  createButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    elevation: 3,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 25,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#333333",
    textTransform: "uppercase",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555555",
    fontWeight: "600",
  },
  input: {
    height: 45,
    borderColor: "#dddddd",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    borderColor: "#dddddd",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    textAlignVertical: "top",
    fontSize: 16,
  },
  pickerContainer: {
    borderColor: "#dddddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
  },
  picker: {
    height: 45,
    width: "100%",
    color: "#333333",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 50,
    elevation: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  closeButton: {
    backgroundColor: "#FF5252",
    paddingVertical: 10,
    borderRadius: 50,
    marginTop: 20,
    elevation: 3,
    marginBottom: 30,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  error: {
    color: "red",
    marginTop: 16,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default CreateProblemModal;
