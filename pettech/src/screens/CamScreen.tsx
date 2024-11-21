// CamScreen.tsx

import React, { useState } from "react";
import { View } from "react-native";
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme
import EspCameraView from "../components/EspCameraScreen";
import EspCameraImageView from "../components/EspCameraScreen";

const CamScreen = () => {
  const { theme } = useTheme();
  const cameraUrl = "http://<IP-ESP32>/capture";

  return (
    <View style={[theme.styles.container]}>
      <View
        style={[
          theme.styles.containerSet,
          { paddingHorizontal: 20, paddingTop: 20 },
        ]}
      >
        {/* <EspCameraImageView streamUrl={cameraUrl} /> */}
      </View>
    </View>
  );
};

export default CamScreen;
