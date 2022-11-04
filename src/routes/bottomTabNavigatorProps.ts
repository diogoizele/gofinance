import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export type RootBottomTabNavigatorProps = {
  Listagem: undefined;
  Cadastrar: undefined;
  Resumo: undefined;
};

export const rootBottomTabNavigator =
  createBottomTabNavigator<RootBottomTabNavigatorProps>();
