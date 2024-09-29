import { ThemeProvider } from "./src/hooks/ThemeProvider";
import DrawerNavigator from "./src/navigation/DrawerNavigation";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <DrawerNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}

// Este componente no se usa, así que lo puedes eliminar si no es necesario
const AppState = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
