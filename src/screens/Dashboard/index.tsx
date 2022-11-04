import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { HightLightCard } from "../../components/HightLightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import { KEYS } from "../../global/constants/asyncStorageKeys";
import {
  Container,
  Header,
  HightLightCards,
  Icon,
  LogoutButton,
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

export interface DataListProps extends TransactionCardProps {
  id: number;
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);

  async function getAsyncStorageTransactions() {
    const asyncStorageTransactions = await AsyncStorage.getItem(
      KEYS.TRANSACTIONS
    );

    const transactions = asyncStorageTransactions
      ? JSON.parse(asyncStorageTransactions)
      : [];

    const formattedTransactions: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          ...item,
          amount,
          date,
          type: item.type,
        };
      }
    );

    setTransactions(formattedTransactions);
  }

  useEffect(() => {
    getAsyncStorageTransactions();
  }, []);

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
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
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
          keyExtractor={(item: DataListProps) => item.id}
          renderItem={({ item }: { item: DataListProps }) => (
            <TransactionCard data={item} />
          )}
        />
      </Transactions>
    </Container>
  );
}
