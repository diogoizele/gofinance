import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container = styled(TouchableOpacity)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;

  padding: 18px;

  margin-top: 16px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 15px;
  
  color: ${({ theme }) => theme.colors.shape};
`;
