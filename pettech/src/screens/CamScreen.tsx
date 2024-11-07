// CamScreen.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme
import ImageUploader from "../components/ImageUploader";
import PhotoScreen from "../components/PhotoScreen";
import NotificationButton from "../components/NotificationButton";

const CamScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[theme.styles.container]}>
      <View
        style={[
          theme.styles.containerSet,
          { paddingHorizontal: 20, paddingTop: 20 },
        ]}
      >
        <NotificationButton />
      </View>
    </View>
  );
};

export default CamScreen;
