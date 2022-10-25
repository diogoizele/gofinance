import { Container, Title } from "./styles";
import { TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  children: string;
}

export function Button({ children, ...rest }: Props) {
  return (
    <Container {...rest} activeOpacity={0.7}>
      <Title>{children}</Title>
    </Container>
  );
}
