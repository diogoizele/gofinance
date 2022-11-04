import { useState } from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { InputForm } from "../../components/InputForm";
import { CategorySelect } from "../CategorySelect";
import {
  Container,
  Fields,
  Form,
  Header,
  Title,
  TransactionsButtonContainer,
} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEYS } from "../../global/constants/asyncStorageKeys";
import { ScreenNavigationProps } from "../../routes/app.routes";

const DEFAULT_CATEGORY = {
  key: "category",
  name: "Categoria",
};

interface FormData {
  name: string;
  amount: string;
}

const SCHEMA_VALIDATOR = Yup.object()
  .shape({
    name: Yup.string().required("Nome é obrigatório"),
    amount: Yup.number()
      .typeError("Informe um valor numérico")
      .positive("O valor não pode ser negativo")
      .required("Preço é obrigatório"),
  })
  .required();

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState(DEFAULT_CATEGORY);

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(SCHEMA_VALIDATOR),
  });

  const { navigate } = useNavigation<ScreenNavigationProps>();

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function clearFields() {
    reset();
    setTransactionType("");
    setCategory(DEFAULT_CATEGORY);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType)
      return Alert.alert(
        "Não foi possível cadastrar",
        "Selecione o tipo da transação"
      );

    if (category.key === "category")
      return Alert.alert("Não foi possível cadastrar", "Selecione a categoria");

    const data = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const currentData = await AsyncStorage.getItem(KEYS.TRANSACTIONS);

      const currentDataFormatted = currentData ? JSON.parse(currentData) : [];

      const dataFormatted = [...currentDataFormatted, data];

      await AsyncStorage.setItem(
        KEYS.TRANSACTIONS,
        JSON.stringify(dataFormatted)
      );

      clearFields();
      navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
  }

  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionsButtonContainer>
              <TransactionTypeButton
                isActive={transactionType === "up"}
                type="up"
                title="Entrada"
                onPress={() => handleTransactionTypeSelect("up")}
              />
              <TransactionTypeButton
                isActive={transactionType === "down"}
                type="down"
                title="Saída"
                onPress={() => handleTransactionTypeSelect("down")}
              />
            </TransactionsButtonContainer>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>
          <Button onPress={handleSubmit(handleRegister)}>Enviar</Button>
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
