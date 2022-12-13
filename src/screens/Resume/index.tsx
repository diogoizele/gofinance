import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";

import { HistoryCard } from "../../components/HistoryCard";
import { KEYS } from "../../global/constants/asyncStorageKeys";
import { categories } from "../../utils/categories";

import {
  ChartContainer,
  Container,
  Header,
  HistoryList,
  Title,
} from "./styles";
import { currency } from "../../utils/currencyFormat";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";

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
  const [expensives, setExpensives] = useState<FormattedExpensiveProps[]>([]);
  const [expensiveTotal, setExpensiveTotal] = useState(0);

  async function loadData() {
    const response = await AsyncStorage.getItem(KEYS.TRANSACTIONS);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) => expensive.type === "negative"
    );

    const expensivesTotal = expensives.reduce(
      (total: number, expensive: TransactionData) =>
        Number(total + expensive.amount),
      0
    );

    setExpensiveTotal(expensivesTotal);

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

        const percent = `${((categorySum / expensiveTotal) * 100).toFixed(0)}%`;

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
  }

  useFocusEffect(() => {
    loadData();
  });

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
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
    </Container>
  );
}
