import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from "./styles";

interface Props {
  type: "positive" | "negative" | "total";
  title: string;
  amount: string;
  lastTransaction: string;
}
const icon = {
  positive: "arrow-up-circle",
  negative: "arrow-down-circle",
  total: "dollar-sign",
};

export function HightLightCard({
  amount,
  lastTransaction,
  title,
  type,
}: Props) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>
      <Footer>
        <Amount type={type}>
          {type === "negative" && "- "}
          {amount}
        </Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
}
