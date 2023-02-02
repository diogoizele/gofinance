import { FlatList } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { Dimensions } from "react-native";

import { FormattedExpensiveProps } from ".";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const HistoryList = styled(FlatList<FormattedExpensiveProps>)`
  flex: 1;
`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;

  padding-top: ${RFValue(28)}px;
`;

export const Content = styled.ScrollView`
  width: 100%;

  padding: 0 24px;
`;

export const MonthSelect = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 24;
`;
export const MonthSelectButton = styled(BorderlessButton)``;

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;
export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;

export const EmptyListContainer = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;

  height: ${Dimensions.get("window").height - RFPercentage(50)}px;
`;

export const EmptyListText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.text};
  text-align: center;

  margin-top: ${RFValue(24)}px;
`;
