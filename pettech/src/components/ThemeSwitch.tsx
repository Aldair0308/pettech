import React, { useContext, useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ThemeContext } from "./../hooks/ThemeProvider"; // Importamos el contexto de tema

const AnimatedSwitch: React.FC = () => {
  const [isDay, setIsDay] = useState(true); // Estado local para manejar el modo día/noche en la animación
  const animation = useSharedValue(0); // Valor compartido para la animación

  const themeContext = useContext(ThemeContext); // Obtenemos el contexto de tema
  const { toggleTheme, theme } = themeContext!; // Desestructuramos toggleTheme y theme

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animation.value }],
    };
  });

  // Cambiar el tema y actualizar la animación cuando se presiona el switch
  const handlePress = () => {
    if (animation.value === 0) {
      animation.value = withTiming(100, { duration: 500 });
      setIsDay(false); // Cambia a modo noche
    } else {
      animation.value = withTiming(0, { duration: 500 });
      setIsDay(true); // Cambia a modo día
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
                ? require("./../../assets/day.jpg")
                : require("./../../assets/night.jpg")
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

export default AnimatedSwitch;
