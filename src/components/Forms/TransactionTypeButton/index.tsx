import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
  type: "positive" | "negative";
  isActive: boolean;
}

const icons = {
  positive: "arrow-up-circle",
  negative: "arrow-down-circle",
};

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: Props) {
  return (
    <Container {...rest} isActive={isActive} type={type}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
}
