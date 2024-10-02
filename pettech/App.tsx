import { ThemeProvider } from "./src/hooks/ThemeProvider";
import { AuthProvider } from "./src/context/AuthContext";
import MainStackNavigator from "./src/navigation/StackNavigator";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <MainStackNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}

// Este componente no se usa, así que lo puedes eliminar si no es necesario
const AppState = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
