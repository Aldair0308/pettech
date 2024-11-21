<!--   Plantilla para las screens   -->

// Screen.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme

const PhotoScreen = () => {
const { theme } = useTheme();

return (
<View style={[theme.styles.container]}>
<View
style={[
theme.styles.containerSet,
{ paddingHorizontal: 20, paddingTop: 20 },
]} >
<Text style={[theme.text]}>Choose photo</Text>
</View>
</View>
);
};

export default PhotoScreen;
