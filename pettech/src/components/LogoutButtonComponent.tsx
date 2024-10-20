import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../hooks/useTheme";
import { AuthContext } from "./../context/AuthContext";

interface LogoutButtonProps {
  buttonStyle?: any;
  textStyle?: any;
}

const LogoutButtonComponent: React.FC<LogoutButtonProps> = ({
  buttonStyle,
  textStyle,
}) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { logout } = React.useContext(AuthContext);

  const handleLogout = () => {
    // Realizar la acción de cierre de sesión
    logout();
    // Navegar a la pantalla de inicio de sesión
    navigation.navigate("App");
  };

  return (
    <TouchableOpacity
      onPress={handleLogout}
      style={[theme.styles.button, buttonStyle]} // Usar estilos del tema
    >
      <Text style={[theme.styles.buttonText, textStyle]}>Cerrar Sesión</Text>
    </TouchableOpacity>
  );
};

export default LogoutButtonComponent;
