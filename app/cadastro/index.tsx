import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CameraView, useCameraPermissions } from 'expo-camera';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import styles from './style';

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
  const [showCamera, setShowCamera] = useState(false);

  // DatePickers Control
  const [showDataFabricacao, setShowDataFabricacao] = useState(false);
  const [showPrazoValidade, setShowPrazoValidade] = useState(false);

  // Camera Permissions and Reference
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

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
      id: uuidv4(),
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
      const listaAtualizada = produtosExistentes ? JSON.parse(produtosExistentes) : [];
      listaAtualizada.push(novoProduto);

      await AsyncStorage.setItem('@produtos', JSON.stringify(listaAtualizada));
      Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
      
      // Limpa os campos após salvar
      setNomeProduto('');
      setQuantidade('');
      setLote('');
      setCodigoBarras('');
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

    <Text style={styles.label}>Prazo de Validade:</Text>
    <TouchableOpacity onPress={() => setShowPrazoValidade(true)}>
      <Text style={styles.input}>{prazoValidade.toDateString()}</Text>
    </TouchableOpacity>

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

      <Button title="Salvar Produto" onPress={handleSave} />
    </ScrollView>
  );
};

export default Cadastro;
