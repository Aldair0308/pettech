import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../hooks/useTheme";
import LogoutButtonComponent from "././LogoutButtonComponent"; // Importa el nuevo componente de botón de cierre de sesión
import ShowImageHookComponent from "./ShowImageHookComponent";
import ThemeSwitcher from "./ThemeSwitcher";
import CustomButton from "./CustomButton";
import DrawerButton from "./DrawerButton";

const DrawerContent = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handlePress = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ShowImageHookComponent />
      <DrawerButton
        navigation={navigation}
        screenName="Perfil"
        title="Perfil"
      />
      <DrawerButton navigation={navigation} screenName="Tema" title="Tema" />
      <DrawerButton
        navigation={navigation}
        screenName="CatalogoScreen"
        title="Catalogo"
      />
      <LogoutButtonComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  toggleButton: {
    borderRadius: 17,
    alignContent: "center",
    alignItems: "center",
    width: "90%",
    margin: 10,
    padding: 10,
    backgroundColor: "#063175",
  },
  toggleButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userSection: {
    alignItems: "center",
    marginBottom: 10,
  },
  drawerItem: {
    padding: 10,
  },
  drawerItem2: {
    borderWidth: 1,
    margin: 9,
    alignItems: "center",
    alignContent: "center",
    borderRadius: 17,
    width: "90%",
    padding: 10,
  },
  drawerItemText: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default DrawerContent;
