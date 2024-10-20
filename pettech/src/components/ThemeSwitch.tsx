import React, { useContext } from "react";
import { View, StyleSheet, Switch } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ThemeContext } from "./../hooks/ThemeProvider";
import { lightTheme } from "../themes/appTheme";

const ThemeSwitch: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  const { toggleTheme, theme } = themeContext;
  const isLightMode = theme === lightTheme;

  return (
    <View style={styles.container}>
      <Icon name="moon" size={24} color={isLightMode ? "#FFD700" : "#444"} />
      <Switch
        value={isLightMode}
        onValueChange={toggleTheme}
        trackColor={{ false: "#444", true: "#FFD700" }}
        thumbColor={isLightMode ? "#FFF" : "#444"}
      />
      <Icon name="sun" size={24} color={isLightMode ? "#444" : "#FFD700"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
});

export default ThemeSwitch;
