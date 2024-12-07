// ProblemScreen.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from "react-native";
import { useTheme } from "./../hooks/useTheme"; // Importa el hook useTheme
import ProblemList from "../components/ProblemList";
import CreateProblemForm from "../components/CreateProblemForm";

const ProblemScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[theme.styles.container]}>
      <View
        style={[
          theme.styles.containerSet,
          { paddingHorizontal: 20, paddingTop: 20 },
        ]}
      >
        <SafeAreaView>
          <ProblemList />
        </SafeAreaView>
      </View>
      <CreateProblemForm />
    </View>
  );
};

export default ProblemScreen;
