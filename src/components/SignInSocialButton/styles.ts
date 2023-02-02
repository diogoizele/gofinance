import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(RectButton)`
  height: ${RFValue(56)}px;

  background: ${({ theme }) => theme.colors.shape};
  border-radius: ${RFValue(5)}px;

  flex-direction: row;
  align-items: center;

  margin-bottom: ${RFValue(16)}px;
`;

export const ImageContainer = styled.View`
  height: 100%;

  justify-content: center;
  align-items: center;

  padding: ${RFValue(16)}px;

  border-color: ${({ theme }) => theme.colors.background};
  border-right-width: ${RFValue(1)}px;
`;

export const Text = styled.Text`
  flex: 1;

  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.title};

  margin-left: ${RFValue(16)}px;

  text-align: center;
`;
