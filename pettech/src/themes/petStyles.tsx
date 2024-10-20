import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  pickerContainer: {
    width: "90%", // Ajusta el ancho según lo necesites
    height: 45,
    backgroundColor: "white",
    borderRadius: 50,
    borderColor: "gray",
    borderWidth: 2,
    marginBottom: 8,
    justifyContent: "center",
    overflow: "hidden", // Asegura que el contenido no sobresalga
  },
  picker: {
    height: "100%",
    width: "100%",
    color: "gray", // Color del texto del Picker
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  registerText: {
    fontSize: 15,
    color: "#5d73c4",
    marginBottom: -3,
  },
  promtText: {
    fontSize: 12,
    color: "gray",
    marginBottom: 3,
    alignSelf: "flex-start",
    marginLeft: 30,
  },
  promtText2: {
    fontSize: 12,
    color: "gray",
    marginBottom: 3,
  },
  headerImage: {
    width: "100%",
    height: 200,
  },
  footerImage: {
    width: "100%",
    height: 100,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 44,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#8396dc",
  },
  input: {
    width: "90%",
    height: 45,
    backgroundColor: "white",
    borderRadius: 50,
    marginBottom: 8,
    paddingHorizontal: 15,
    borderColor: "gray",
    borderWidth: 2,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    width: 200,
    height: 60,
    backgroundColor: "#6a7dc5",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 9,
  },
  buttonText: {
    color: "white",
    fontSize: 26,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  //   modalContainer: {
  //     width: 300,
  //     padding: 20,
  //     backgroundColor: "white",
  //     borderRadius: 10,
  //     alignItems: "center",
  //   },
  modalText2: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
    color: "white",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#6a7dc5",
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
  //   row: {
  //     flexDirection: "row",
  //     flexWrap: "wrap",
  //     justifyContent: "center",
  //   },
  //   option: {
  //     padding: 10,
  //     borderWidth: 1,
  //     borderColor: "#ccc",
  //     margin: 5,
  //     borderRadius: 5,
  //     backgroundColor: "#eaeaea",
  //   },
  //   confirmButton: {
  //     marginTop: 20,
  //     padding: 10,
  //     backgroundColor: "green",
  //     borderRadius: 5,
  //     alignItems: "center",
  //   },
  //   closeButton: {
  //     marginTop: 10,
  //     padding: 10,
  //     backgroundColor: "red",
  //     borderRadius: 5,
  //     alignItems: "center",
  //   },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  card: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  pickerContainer2: {
    marginBottom: 20,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#eaeaea",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  confirmButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "green",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
    alignItems: "center",
  },
  selectedTimeText: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  horas: {
    flexDirection: "row",
    justifyContent: "space-between", // Espacio entre los elementos
    alignItems: "center", // Centra verticalmente
    width: "90%",
    height: 45,
    backgroundColor: "white",
    borderRadius: 50,
    marginBottom: 8,
    paddingHorizontal: 15,
    borderColor: "gray",
    borderWidth: 2,
  },

  item: {
    flex: 1, // Cada item ocupa el mismo espacio
    alignItems: "center", // Centra el texto dentro de cada item
    justifyContent: "center", // Centra verticalmente el texto
  },
});

export default styles; // Asegúrate de exportar el objeto styles
