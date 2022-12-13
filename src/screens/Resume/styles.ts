import { FlatList } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
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
  width: 100%;

  padding: 0 24px;
`;

export const ChartContainer = styled.View`
  /* width: 100%; */
  /* align-items: center; */

  padding-top: ${RFValue(28)}px;
  /* margin: 0 24px; */
`;
