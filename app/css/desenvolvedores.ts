// app/desenvolvedores/style.ts
import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f4f4f8', // Um fundo suave
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60, // Para fazer a imagem redonda
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#7B68EE', // Uma cor de destaque
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  role: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
  section: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5, // Sombra para Android
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600', // Um pouco mais de peso na fonte
    color: '#7B68EE',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24, // Melhorar a legibilidade
    textAlign: 'justify',
  },
  linkText: {
    fontSize: 16,
    color: '#007AFF', // Cor padrão para links no iOS
    marginVertical: 8,
  },
  appInfoText: {
    fontSize: 16,
    color: '#444',
    marginVertical: 4,
  },
  footer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#888',
  }
});
