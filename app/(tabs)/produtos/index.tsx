import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import styles from '../../css/produtos';

type Produto = {
  id: string;
  nomeProduto: string;
  dataFabricacao: string;
  prazoValidade: string;
  quantidade: string;
  lote: string;
  codigoBarras: string;
  estadoOrigem: string;
};

const Produtos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const router = useRouter();

  // Atualiza a lista quando a tela é focada
  useFocusEffect(
    React.useCallback(() => {
      const carregarProdutos = async () => {
        try {
          const dados = await AsyncStorage.getItem('@produtos');
          if (dados) {
            setProdutos(JSON.parse(dados));
          }
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível carregar os produtos.');
        }
      };
      carregarProdutos();
    }, [])
  );

  const excluirProduto = async (id: string) => {
    Alert.alert('Confirmação', 'Deseja excluir este produto?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          const produtosAtualizados = produtos.filter((item) => item.id !== id);
          setProdutos(produtosAtualizados);
          await AsyncStorage.setItem('@produtos', JSON.stringify(produtosAtualizados));
          Alert.alert('Sucesso', 'Produto excluído com sucesso!');
        },
      },
    ]);
  };

  const editarProduto = (produto: Produto) => {
    router.push({
      pathname: '/cadastro',
      params: {
        produto: JSON.stringify(produto)
      }
    });
  };

  const renderItem = ({ item }: { item: Produto }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nomeProduto}</Text>
      <Text style={styles.text}>Fabricação: {item.dataFabricacao}</Text>
      <Text style={styles.text}>Validade: {item.prazoValidade}</Text>
      <Text style={styles.text}>Quantidade: {item.quantidade}</Text>
      <Text style={styles.text}>Lote: {item.lote}</Text>
      <Text style={styles.text}>Código de Barras: {item.codigoBarras}</Text>
      <Text style={styles.text}>Origem: {item.estadoOrigem}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => editarProduto(item)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={() => excluirProduto(item.id)}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>}
      />
    </View>
  );
};

export default Produtos;
