import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

import { HightLightCard } from "../../components/HightLightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import { KEYS } from "../../global/constants/asyncStorageKeys";
import {
  Container,
  EmptyStateContainer,
  EmptyStateText,
  Header,
  HightLightCards,
  Icon,
  LoadContainer,
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
import theme from "../../global/styles/theme";
import { currency } from "../../utils/currencyFormat";
import { date as formatDate } from "../../utils/dateFormat";
import { useAuth } from "../../hooks/auth/useAuth";

export interface DataListProps extends TransactionCardProps {
  id: number;
}

interface HightlightData {
  amount: string;
  lastTransaction: string;
}

interface HightlightProps {
  entries: HightlightData;
  expensive: HightlightData;
  total: HightlightData;
}

const transactionsText = {
  positive: "entrada",
  negative: "saída",
  total: "total",
};

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [highlightData, setHighlightData] = useState<HightlightProps>(
    {} as HightlightProps
  );
  const { user, signOut } = useAuth();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "positive" | "negative" | "total"
  ) {
    if (type === "total") {
      if (collection.length === 0) {
        return "Nenhuma transação";
      }

      const lastTransaction = new Date(
        Math.max.apply(
          Math,
          collection.map((transaction) => new Date(transaction.date).getTime())
        )
      );

      return `Total em ${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
        "pt-BR",
        { month: "long" }
      )}`;
    }

    const lastTransactionTypeText = transactionsText[type];
    const collectionFilteredByType = collection
      .filter((transaction) => transaction.type === type)
      .map(({ date }) => new Date(date)?.getTime());

    if (collectionFilteredByType.length === 0) {
      return `Nenhuma ${lastTransactionTypeText} encontrada`;
    }

    const lastDate = new Date(Math.max.apply(Math, collectionFilteredByType));

    const formattedLastDate = formatDate(lastDate);

    return `Ultima ${lastTransactionTypeText} dia ${formattedLastDate}`;
  }

  async function getAsyncStorageTransactions() {
    const asyncStorageTransactions = await AsyncStorage.getItem(
      KEYS.TRANSACTIONS
    );

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactions: DataListProps[] = asyncStorageTransactions
      ? JSON.parse(asyncStorageTransactions)
      : [];

    const formattedTransactions: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = currency(Number(item.amount));

        const date = formatDate(item.date);

        return {
          ...item,
          amount,
          date,
          type: item.type,
        };
      }
    );

    setTransactions(formattedTransactions);
    setHighlightData({
      entries: {
        amount: currency(entriesTotal),
        lastTransaction: getLastTransactionDate(transactions, "positive"),
      },
      expensive: {
        amount: currency(expensiveTotal),
        lastTransaction: getLastTransactionDate(transactions, "negative"),
      },
      total: {
        amount: currency(entriesTotal - expensiveTotal),
        lastTransaction: getLastTransactionDate(transactions, "total"),
      },
    });
    setIsLoading(false);
  }

  useEffect(() => {
    getAsyncStorageTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getAsyncStorageTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user?.picture,
                  }}
                />
                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>{user?.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HightLightCards>
            <HightLightCard
              title="Entradas"
              amount={highlightData?.entries?.amount}
              lastTransaction={highlightData?.entries?.lastTransaction}
              type="positive"
            />
            <HightLightCard
              title="Saídas"
              amount={highlightData?.expensive?.amount}
              lastTransaction={highlightData?.expensive?.lastTransaction}
              type="negative"
            />
            <HightLightCard
              title="Total"
              amount={highlightData?.total?.amount}
              lastTransaction={highlightData?.total?.lastTransaction}
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
              ListEmptyComponent={ListEmptyComponent}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}

const ListEmptyComponent = () => {
  return (
    <EmptyStateContainer>
      <EmptyStateText>Nenhuma transação encontrada</EmptyStateText>
    </EmptyStateContainer>
  );
};
