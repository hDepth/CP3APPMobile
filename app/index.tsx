import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Menu Principal</Text>
      <Link href="/cadastro" asChild>
        <Button title="Cadastrar Produto" />
      </Link>
      <Link href="/produtos" asChild>
        <Button title="Lista de Produtos" />
      </Link>
      <Link href="/desenvolvedores" asChild>
        <Button title="Desenvolvedores" />
      </Link>
    </View>
  );
}
