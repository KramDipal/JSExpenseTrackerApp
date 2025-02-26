import React from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground,Image } from 'react-native';

import { useContext } from 'react';

import { DBContextStore } from '../dbContext';
import { LinearGradient } from 'expo-linear-gradient';
export default function DashboardScreen({ expenses }) {
//   const totalSpending = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const dbcontextStore = useContext(DBContextStore);

  const  { newExpenses }  = useContext(DBContextStore);
  // Calculate total from newExpenses instead of props.expenses
  const totalSpending = newExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

// console.log('DashboardScreen ' + JSON.stringify(newExpenses));

  return (
    <LinearGradient
    colors={['#0288D1', '#4FC3F7']} // Blue gradient for Dashboard
    style={styles.gradient}
    >
    <View style={styles.container}>
      <Text style={styles.total}>Total Spending: Php {totalSpending.toFixed(2)}</Text>
      <Text style={styles.header}>Recent Expenses</Text>
      <FlatList
        // data={expenses.slice(-5).reverse()} // Last 5, newest first
        data={newExpenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{`${item.id} | ${item.date} | Php ${item.amount} | ${item.category} | ${item.notes}`}
          {item.photo && <Image source={{ uri: item.photo }} style={{ width: 100, height: 100 }} />}
          </Text>
        )}
      />
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
gradient: { flex: 1 },
  container: { flex: 1, padding: 20 },
  total: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  header: { fontSize: 18, marginBottom: 10 },
});