import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 70%;

  background: ${({ theme }) => theme.colors.primary};

  justify-content: flex-end;
  align-items: center;
`;
export const Footer = styled.View`
  width: 100%;
  height: 30%;

  background: ${({ theme }) => theme.colors.secondary};
`;

export const TitleWapper = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(30)};
  color: ${({ theme }) => theme.colors.shape};

  text-align: center;

  margin-top: ${RFValue(45)}px;
`;

export const SignInTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(16)};
  color: ${({ theme }) => theme.colors.shape};

  text-align: center;

  margin-top: ${RFValue(80)}px;
  margin-bottom: ${RFValue(67)}px;
`;

export const FooterWrapper = styled.View`
  margin-top: ${RFValue(-30)}px;
  padding: 0 ${RFValue(32)}px;

  justify-content: space-between;
`;
