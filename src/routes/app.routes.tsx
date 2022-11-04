import { Platform } from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { MaterialIcons as Icon } from "@expo/vector-icons";

import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { useTheme } from "styled-components";
import {
  rootBottomTabNavigator,
  RootBottomTabNavigatorProps,
} from "./bottomTabNavigatorProps";

const { Navigator, Screen } = rootBottomTabNavigator;

export type ScreenNavigationProps = BottomTabNavigationProp<
  RootBottomTabNavigatorProps,
  "Listagem"
>;

export function AppRoutes() {
  const { colors } = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 88,
        },
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} name="format-list-bulleted" size={size} />
          ),
        }}
      />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} name="attach-money" size={size} />
          ),
        }}
      />
      <Screen
        name="Resumo"
        component={Register}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} name="pie-chart" size={size} />
          ),
        }}
      />
    </Navigator>
  );
}
