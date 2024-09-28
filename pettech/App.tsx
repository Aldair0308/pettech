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

const AppState = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
