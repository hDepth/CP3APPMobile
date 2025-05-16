
import React from 'react';
import { View, Text, Image, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../../css/desenvolvedores'; 


const AvatarImage = require('../../../assets/FotoEuLinkedin.jpg');


const DeveloperScreen = () => {
  const developerInfo = {
    name: 'Pedro Henrique Jorge De Paula',
    role: 'Desenvolvedor React Native',
    bio: 'Apaixonado por tecnologia e desenvolvimento de aplicativos móveis que resolvem problemas reais e facilitam a vida das pessoas. Sempre em busca de novos desafios e aprendizados.',
    email: 'dephenriquejp@gmail.com',
    linkedin: 'https://www.linkedin.com/in/pedro-paula-fullstack-developer/',
    github: 'https://github.com/hDepth',
    appVersion: '1.0.0',
    avatarLocal: AvatarImage,

  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Não foi possível abrir o link:", err));
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={developerInfo.avatarLocal} style={styles.avatar} />
        <Text style={styles.name}>{developerInfo.name}</Text>
        <Text style={styles.role}>{developerInfo.role}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre Mim</Text>
        <Text style={styles.bio}>{developerInfo.bio}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contato</Text>
        <TouchableOpacity onPress={() => openLink(`mailto:${developerInfo.email}`)}>
          <Text style={styles.linkText}>Email: {developerInfo.email}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink(developerInfo.linkedin)}>
          <Text style={styles.linkText}>LinkedIn</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink(developerInfo.github)}>
          <Text style={styles.linkText}>GitHub</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre o Aplicativo</Text>
        <Text style={styles.appInfoText}>Versão: {developerInfo.appVersion}</Text>
        <Text style={styles.appInfoText}>Desenvolvido com React Native & Expo.</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© {new Date().getFullYear()} {developerInfo.name}. Todos os direitos reservados.</Text>
      </View>
    </ScrollView>
  );
};

export default DeveloperScreen;
