import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CameraView, useCameraPermissions } from 'expo-camera';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useLocalSearchParams, useRouter } from 'expo-router';
import styles from '../../css/cadastro';

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const Cadastro = () => {
  const [nomeProduto, setNomeProduto] = useState('');
  const [dataFabricacao, setDataFabricacao] = useState(new Date());
  const [prazoValidade, setPrazoValidade] = useState(new Date());
  const [quantidade, setQuantidade] = useState('');
  const [lote, setLote] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');
  const [estadoOrigem, setEstadoOrigem] = useState(estados[0]);
  const [produtoId, setProdutoId] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const [showDataFabricacao, setShowDataFabricacao] = useState(false);
  const [showPrazoValidade, setShowPrazoValidade] = useState(false);

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const { produto } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (produto) {
      const p = JSON.parse(produto as string);
      setProdutoId(p.id);
      setNomeProduto(p.nomeProduto);
      setDataFabricacao(new Date(p.dataFabricacao));
      setPrazoValidade(new Date(p.prazoValidade));
      setQuantidade(p.quantidade);
      setLote(p.lote);
      setCodigoBarras(p.codigoBarras);
      setEstadoOrigem(p.estadoOrigem);
    }
  }, [produto]);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setCodigoBarras(data);
    setShowCamera(false);
    Alert.alert("Código Detectado", `Tipo: ${type}\nValor: ${data}`);
  };

  const openCamera = async () => {
    if (!cameraPermission?.granted) {
      await requestCameraPermission();
    }
    if (cameraPermission?.granted) {
      setShowCamera(true);
    } else {
      Alert.alert('Permissão negada para acessar a câmera');
    }
  };

  const handleSave = async () => {
    if (!nomeProduto || !quantidade || !lote || !codigoBarras) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos!');
      return;
    }

    const novoProduto = {
      id: produtoId ?? uuidv4(),
      nomeProduto,
      dataFabricacao: dataFabricacao.toDateString(),
      prazoValidade: prazoValidade.toDateString(),
      quantidade,
      lote,
      codigoBarras,
      estadoOrigem,
    };

    try {
      const produtosExistentes = await AsyncStorage.getItem('@produtos');
      let listaAtualizada = produtosExistentes ? JSON.parse(produtosExistentes) : [];

      if (produtoId) {
        // Atualiza o produto existente
        listaAtualizada = listaAtualizada.map((p: any) =>
          p.id === produtoId ? novoProduto : p
        );
      } else {
        // Adiciona novo produto
        listaAtualizada.push(novoProduto);
      }

      await AsyncStorage.setItem('@produtos', JSON.stringify(listaAtualizada));
      Alert.alert('Sucesso', produtoId ? 'Produto atualizado com sucesso!' : 'Produto cadastrado com sucesso!');

      // Limpa os campos
      setProdutoId(null);
      setNomeProduto('');
      setQuantidade('');
      setLote('');
      setCodigoBarras('');
      router.back(); // volta para a listagem
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o produto.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome do Produto:</Text>
      <TextInput style={styles.input} value={nomeProduto} onChangeText={setNomeProduto} placeholder="Digite o nome do produto" />

      <Text style={styles.label}>Data de Fabricação:</Text>
      <TouchableOpacity onPress={() => setShowDataFabricacao(true)}>
        <Text style={styles.input}>{dataFabricacao.toDateString()}</Text>
      </TouchableOpacity>
      {showDataFabricacao && (
        <DateTimePicker
          value={dataFabricacao}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDataFabricacao(false);
            if (date) setDataFabricacao(date);
          }}
        />
      )}

      <Text style={styles.label}>Prazo de Validade:</Text>
      <TouchableOpacity onPress={() => setShowPrazoValidade(true)}>
        <Text style={styles.input}>{prazoValidade.toDateString()}</Text>
      </TouchableOpacity>
      {showPrazoValidade && (
        <DateTimePicker
          value={prazoValidade}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowPrazoValidade(false);
            if (date) setPrazoValidade(date);
          }}
        />
      )}

      <Text style={styles.label}>Quantidade:</Text>
      <TextInput style={styles.input} value={quantidade} onChangeText={setQuantidade} placeholder="Digite a quantidade" keyboardType="numeric" />

      <Text style={styles.label}>Lote:</Text>
      <TextInput style={styles.input} value={lote} onChangeText={setLote} placeholder="Digite o lote" />

      <Text style={styles.label}>Estado de Origem:</Text>
      <View style={styles.picker}>
        <Picker selectedValue={estadoOrigem} onValueChange={(itemValue) => setEstadoOrigem(itemValue)}>
          {estados.map((estado) => (
            <Picker.Item key={estado} label={estado} value={estado} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Código de Barras:</Text>
      <TextInput style={styles.input} value={codigoBarras} editable={false} placeholder="Escaneie o código de barras" />
      <Button title="Escanear Código de Barras" onPress={openCamera} />

      {showCamera && (
        <CameraView
          ref={cameraRef}
          style={{ height: 400, marginVertical: 10 }}
          onBarcodeScanned={handleBarCodeScanned}
        />
      )}

      <Button title={produtoId ? 'Salvar Alterações' : 'Salvar Produto'} onPress={handleSave} />
    </ScrollView>
  );
};

export default Cadastro;
