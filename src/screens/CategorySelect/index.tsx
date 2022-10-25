import { FlatList } from "react-native";
import { Button } from "../../components/Forms/Button";
import { categories } from "../../utils/categories";
import {
  Category,
  Container,
  Footer,
  Header,
  Icon,
  Name,
  Separator,
  Title,
} from "./styles";

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: Props) {
  function handleSelectCategory(category: Category) {
    setCategory(category);
  }

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => (
          <Category
            isActive={category.key === item.key}
            onPress={() => handleSelectCategory(item)}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
      />

      <Footer>
        <Button onPress={closeSelectCategory}>Selecionar</Button>
      </Footer>
    </Container>
  );
}
