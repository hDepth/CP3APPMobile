import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'; // Exemplos de bibliotecas de ícones
import { styles } from '../css/Home'; 
//import LogoImage from '../../assets/FotoEuLinkedin.jpg';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          
  

          <MaterialCommunityIcons name="store-check" size={60} color="#fff" />
          <Text style={styles.headerText}>Gestor de Estoque</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Ações Rápidas</Text>

          <View style={styles.buttonGrid}>
            <Link href="/cadastro" asChild>
              <TouchableOpacity style={styles.buttonContainer}>
                <Feather name="plus-square" size={40} color="#007bff" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Cadastrar Novo Produto</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/produtos" asChild>
              <TouchableOpacity style={styles.buttonContainer}>
                <Feather name="list" size={40} color="#007bff" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Ver Lista de Produtos</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/desenvolvedores" asChild>
              <TouchableOpacity style={styles.buttonContainer}>
                <Feather name="users" size={40} color="#007bff" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Sobre os Desenvolvedores</Text>
              </TouchableOpacity>
            </Link>

           
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Seu App de Controle de Estoque © {new Date().getFullYear()}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}