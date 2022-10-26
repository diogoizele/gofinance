import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{ tabBarIcon: () => <Feather name="activity" /> }}
      />
      <Screen name="Cadastrar" component={Register} />
      <Screen name="Resumo" component={Register} />
    </Navigator>
  );
}
