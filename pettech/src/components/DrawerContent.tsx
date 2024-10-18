import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../hooks/useTheme";
import LogoutButtonComponent from "././LogoutButtonComponent"; // Importa el nuevo componente de botón de cierre de sesión
import ShowImageHookComponent from "./ShowImageHookComponent";
import ThemeSwitcher from "./ThemeSwitcher";
import CustomButton from "./CustomButton";

const DrawerContent = () => {
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme();

  const handlePress = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ShowImageHookComponent />
      <CustomButton
        navigation={navigation}
        screenName="CatalogoScreen"
        title="Catalogo"
      />

      <TouchableOpacity
        onPress={toggleTheme}
        style={{
          ...styles.drawerItem2,
          backgroundColor:
            theme.styles.button.backgroundColor ||
            theme.colors.buttonBackground,
        }}
      >
        <Text
          style={{ ...styles.drawerItemText, color: theme.colors.buttonText }}
        >
          Cambia Tema
        </Text>
        <ThemeSwitcher />
      </TouchableOpacity>
      <LogoutButtonComponent
        buttonStyle={styles.drawerItem}
        textStyle={styles.drawerItemText}
      />
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
