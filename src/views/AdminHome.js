import React, {useContext}from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';



export default function AdminHome() {
  const { login } = useContext(AppContext);
  const { logout } = useContext(AppContext);
 return (
 <View style={styles.container}>
 <Text style={styles.title}>Área do Administrador</Text>
 <Text style={styles.subtitle}>Controle de Tickets</Text>
 {/* Botão customizado */}
 <TouchableOpacity
 style={styles.button}
 onPress={() => logout()}

 activeOpacity={0.8}
 >
 <Text style={styles.buttonText}>Sair (Logout)</Text>
 </TouchableOpacity>
 </View>
 );
}
const styles = StyleSheet.create({
 container: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 backgroundColor: '#ffebee',
 },
 title: {
 fontSize: 24,
 fontWeight: 'bold',
 color: '#b71c1c',
 marginBottom: 8,
 },
 subtitle: {
 fontSize: 16,
 color: '#c62828',
 marginBottom: 30,
 },
 button: {
 backgroundColor: '#d32f2f',
 paddingVertical: 12,
 paddingHorizontal: 30,
 borderRadius: 8,
 elevation: 4,
 shadowColor: '#000',
 shadowOffset: { width: 0, height: 2 },
 shadowOpacity: 0.25,
 shadowRadius: 3.84,
 },
 buttonText: {
 color: '#ffffff',
 fontSize: 16,
 fontWeight: 'bold',
 },
});