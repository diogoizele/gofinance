import { categories } from "../../utils/categories";
import {
  Date,
  Amount,
  Category,
  CategoryName,
  Container,
  Footer,
  Icon,
  Title,
} from "./styles";

export interface TransactionCardProps {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Props {
  data: TransactionCardProps;
}

export function TransactionCard({ data }: Props) {
  const category = categories.find(({ key }) => key === data.category);

  return (
    <Container>
      <Title>{data?.name}</Title>

      <Amount type={data?.type}>
        {data?.type === "negative" ? `- ${data?.amount}` : data?.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category?.icon} />
          <CategoryName>{category?.name}</CategoryName>
        </Category>
        <Date>{data?.date}</Date>
      </Footer>
    </Container>
  );
}
