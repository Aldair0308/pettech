import React, { useContext } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ThemeContext } from "./../hooks/ThemeProvider";

const ThemeSwitcher: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null; // Maneja el caso de error según necesites
  }

  const { nextTheme, prevTheme, theme } = themeContext;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={prevTheme}
      >
        <Icon name="arrow-left" size={29} color={theme.colors.buttonText} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={nextTheme}
      >
        <Icon name="arrow-right" size={29} color={theme.colors.buttonText} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    borderRadius: 5,
  },
});

export default ThemeSwitcher;
