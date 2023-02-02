import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { addMonths, format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

import { HistoryCard } from "../../components/HistoryCard";
import { KEYS } from "../../global/constants/asyncStorageKeys";
import { categories } from "../../utils/categories";

import {
  ChartContainer,
  Container,
  Content,
  Header,
  HistoryList,
  Title,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  EmptyListText,
  EmptyListContainer,
} from "./styles";
import { currency } from "../../utils/currencyFormat";
import theme from "../../global/styles/theme";
import { LoadContainer } from "../Dashboard/styles";

export interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

type ExpensiveProps = {
  category: string;
  amount: number;
};

export type FormattedExpensiveProps = {
  name: string;
  total: number;
  color: string;
  percent: string;
};

export function Resume() {
  const [isLoading, setIsLoading] = useState(false);
  const [expensives, setExpensives] = useState<FormattedExpensiveProps[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  function handleChangeDate(action: "next" | "prev") {
    if (action === "next") {
      setSelectedDate((currentDate) => addMonths(currentDate, 1));
    } else {
      setSelectedDate((currentDate) => subMonths(currentDate, 1));
    }
  }

  async function loadData() {
    setIsLoading(true);
    const response = await AsyncStorage.getItem(KEYS.TRANSACTIONS);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) =>
        expensive.type === "negative" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    const amountExpensiveTotal = expensives.reduce(
      (total: number, expensive: TransactionData) =>
        Number(total + expensive.amount),
      0
    );

    const expensivesFormattedObject = categories.reduce(
      (categoriesAccumulator, category) => {
        const categorySum = expensives.reduce(
          (expensivesAccumulator: number, expensive: ExpensiveProps) => {
            if (expensive.category === category.key) {
              return expensivesAccumulator + Number(expensive.amount);
            }

            return expensivesAccumulator;
          },
          0
        );

        const percent = `${((categorySum / amountExpensiveTotal) * 100).toFixed(
          0
        )}%`;

        if (categorySum > 0) {
          return [
            ...categoriesAccumulator,
            {
              name: category.name,
              total: categorySum,
              color: category.color,
              percent,
            },
          ];
        }

        return categoriesAccumulator;
      },
      [] as FormattedExpensiveProps[]
    );

    setExpensives(expensivesFormattedObject);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: useBottomTabBarHeight(),
            }}
          >
            <MonthSelect>
              <MonthSelectButton onPress={() => handleChangeDate("prev")}>
                <MonthSelectIcon name="chevron-left" />
              </MonthSelectButton>

              <Month>
                {format(selectedDate, "MMMM, YYY", {
                  locale: ptBR,
                })}
              </Month>

              <MonthSelectButton onPress={() => handleChangeDate("next")}>
                <MonthSelectIcon name="chevron-right" />
              </MonthSelectButton>
            </MonthSelect>

            {expensives.length === 0 && (
              <EmptyListContainer>
                <EmptyListText>Sem registros cadastrados</EmptyListText>
              </EmptyListContainer>
            )}

            {expensives.length > 0 && (
              <>
                <ChartContainer>
                  <VictoryPie
                    data={expensives}
                    colorScale={expensives.map(({ color }) => color)}
                    x="percent"
                    y="total"
                    labelRadius={100}
                    style={{
                      labels: {
                        fontSize: RFValue(18),
                        fontWeight: "bold",
                        fill: theme.colors.shape,
                      },
                    }}
                  />
                </ChartContainer>
                <HistoryList
                  data={expensives}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => (
                    <HistoryCard
                      title={item.name}
                      amount={currency(item.total)}
                      color={item.color}
                    />
                  )}
                />
              </>
            )}
          </Content>
        </>
      )}
    </Container>
  );
}
