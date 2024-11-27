// CamScreen.tsx

import React, { useState } from "react";
import { View } from "react-native";
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme
import EspCameraView from "../components/EspCameraScreen";
import EspCameraImageView from "../components/EspCameraScreen";
import NotificationButton from "../components/NotificationButton";

const CamScreen = () => {
  const { theme } = useTheme();
  const cameraUrl = "http://192.168.100.125/capture";

  return (
    <View style={[theme.styles.container]}>
      <View
        style={[
          theme.styles.containerSet,
          { paddingHorizontal: 20, paddingTop: 20 },
        ]}
      >
        <EspCameraImageView streamUrl={cameraUrl} />
        {/* <NotificationButton /> */}
      </View>
    </View>
  );
};

export default CamScreen;
