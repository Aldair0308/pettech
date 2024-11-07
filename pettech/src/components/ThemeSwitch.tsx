import React, { useContext, useState, useEffect } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";
import { ThemeContext } from "../hooks/ThemeProvider"; // Importamos el contexto de tema
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importamos AsyncStorage

const ThemeSwitch: React.FC = () => {
  const [isDay, setIsDay] = useState(true); // Estado local para manejar el modo día/noche

  const animation = useSharedValue(0); // Valor compartido para la animación

  const themeContext = useContext(ThemeContext); // Obtenemos el contexto de tema
  const { toggleTheme, theme } = themeContext!; // Desestructuramos toggleTheme y theme

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animation.value }], // Movimiento de la "palanca"
    };
  });

  // Cargar el tema persistido desde AsyncStorage cuando el componente se monta
  useEffect(() => {
    const loadTheme = async () => {
      try {
        // Cargar el tema guardado
        const storedTheme = await AsyncStorage.getItem("theme");
        if (storedTheme) {
          setIsDay(storedTheme === "light");
          animation.value = storedTheme === "light" ? 0 : 100; // Iniciar animación según el tema
        }
      } catch (error) {
        console.error("Error al cargar el tema desde AsyncStorage", error);
      }
    };
    loadTheme();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // Cambiar el tema y actualizar la animación cuando se presiona el switch
  const handlePress = async () => {
    if (animation.value === 0) {
      animation.value = withTiming(100, { duration: 500 });
      setIsDay(false); // Cambia a modo noche
      await AsyncStorage.setItem("theme", "dark"); // Guardamos el tema en AsyncStorage
    } else {
      animation.value = withTiming(0, { duration: 500 });
      setIsDay(true); // Cambia a modo día
      await AsyncStorage.setItem("theme", "light"); // Guardamos el tema en AsyncStorage
    }
    toggleTheme(); // Cambia el tema al presionar el switch
  };

  return (
    <View style={[styles.container, theme.container]}>
      <TouchableOpacity
        style={[styles.switchContainer, theme.switchContainer]}
        onPress={handlePress}
      >
        <Animated.View style={[styles.circle, animatedStyle]}>
          <Image
            source={
              isDay
                ? require("./../../assets/day.jpg") // Imagen del modo día
                : require("./../../assets/night.jpg") // Imagen del modo noche
            }
            style={styles.icon}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  switchContainer: {
    width: 150,
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: "100%",
    height: "100%",
    borderRadius: 90,
  },
});

export default ThemeSwitch;
