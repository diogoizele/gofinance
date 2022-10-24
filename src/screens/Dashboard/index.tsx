import { useState } from "react";
import { HightLightCard } from "../../components/HightLightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import {
  Container,
  Header,
  HightLightCards,
  Icon,
  Photo,
  Title,
  TransactionList,
  Transactions,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
} from "./styles";

const data: DataListProps = {
  id: 1,
  title: "Desenvolvimento de site",
  amount: "R$ 12.000,00",
  category: {
    name: "Vendas",
    icon: "dollar-sign",
  },
  date: "13/04/2021",
  type: "positive",
};

const data2: DataListProps = {
  id: 2,
  title: "Potatoes",
  amount: "R$ 39,00",
  category: {
    name: "Alimentção",
    icon: "coffee",
  },
  date: "13/04/2021",
  type: "negative",
};

export interface DataListProps extends TransactionCardProps {
  id: number;
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([
    data,
    data2,
  ]);

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/65031832?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Diogo</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HightLightCards>
        <HightLightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
          type="up"
        />
        <HightLightCard
          title="Saídas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
          type="down"
        />
        <HightLightCard
          title="Total"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
          type="total"
        />
      </HightLightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
