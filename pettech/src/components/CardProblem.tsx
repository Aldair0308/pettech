import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CardProblemProps {
  problema: string;
  estado: string;
  fecha: string;
  descripcion?: string;
  responsable: string;
}

const CardProblem: React.FC<CardProblemProps> = ({
  problema,
  estado,
  fecha,
  descripcion,
  responsable,
}) => {
  // Función para ajustar la fecha y hora a Ciudad de México
  const formatFecha = (fechaISO: string): string => {
    try {
      const dateUTC = new Date(fechaISO); // Fecha en UTC

      // Verificar el horario de verano/invierno de Ciudad de México
      const isDST = (date: Date): boolean => {
        const jan = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
        const jul = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
        return date.getTimezoneOffset() < Math.max(jan, jul);
      };

      // Ajustar la hora manualmente
      const offsetHours = isDST(dateUTC) ? -5 : -6; // -5 en horario de verano, -6 en horario estándar
      const localDate = new Date(
        dateUTC.getTime() + offsetHours * 60 * 60 * 1000
      );

      // Formatear la fecha
      const day = localDate.getDate();
      const month = localDate.toLocaleString("es-ES", { month: "long" });
      const year = localDate.getFullYear();
      const hours = localDate.getHours() % 12 || 12; // Ajustar a formato 12 horas
      const minutes = localDate.getMinutes().toString().padStart(2, "0");
      const period = localDate.getHours() >= 12 ? "AM" : "PM";

      return `${day} de ${month} de ${year}, ${hours}:${minutes} ${period}`;
    } catch (error) {
      console.error("Error al formatear la fecha:", error);
      return "Fecha inválida";
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.problema}>{problema}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.value}>{estado}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.value}>{formatFecha(fecha)}</Text>
      </View>
      {descripcion && (
        <View style={styles.row}>
          <Text style={styles.label}>Descripción:</Text>
          <Text style={styles.value}>{descripcion}</Text>
        </View>
      )}
      <View style={styles.row}>
        <Text style={styles.label}>Usuario:</Text>
        <Text style={styles.value}>{responsable}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  problema: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
  value: {
    fontSize: 14,
    color: "#333",
    textAlign: "right",
  },
});

export default CardProblem;
