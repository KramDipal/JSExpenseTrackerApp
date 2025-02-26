import React from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground,Image, TextInput, Button } from 'react-native';

import { useContext, useState } from 'react';

import { DBContextStore } from '../dbContext';
import { LinearGradient } from 'expo-linear-gradient';
export default function DashboardScreen({ expenses }) {
//   const totalSpending = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const dbcontextStore = useContext(DBContextStore);

  const  { newExpenses, budgetGoal, handleSaveBudget }  = useContext(DBContextStore);
  const [budgetInput, setBudgetInput] = useState('');
  // Calculate total from newExpenses instead of props.expenses
  const totalSpending = newExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  const budgetProgress = budgetGoal ? (totalSpending / budgetGoal) * 100 : 0;

  console.log('DashboardScreen newExpenses ' + JSON.stringify(newExpenses));



    const saveBudget = () => {
    if (budgetInput) {
      handleSaveBudget(budgetInput);
      setBudgetInput('');
    }
  };


  return (
    <LinearGradient colors={['#0288D1', '#4FC3F7']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.total}>Total Spending: Php {totalSpending.toFixed(2)}</Text>
        {budgetGoal ? (
          <>
            <Text style={styles.budget}>Budget Goal: Php {budgetGoal.toFixed(2)}</Text>
            <Text style={styles.progress}>
              Progress: {budgetProgress.toFixed(1)}% (
              {totalSpending > budgetGoal ? 'Over' : 'Under'})
            </Text>
          </>
        ) : (
          <Text style={styles.noBudget}>No budget set</Text>
        )}
        <View style={styles.budgetInputContainer}>
          <TextInput
            style={styles.budgetInput}
            placeholder="Set Budget Goal (Php)"
            keyboardType="numeric"
            value={budgetInput}
            onChangeText={setBudgetInput}
          />
          <Button title="Save Budget" onPress={saveBudget} />
        </View>
        <Text style={styles.header}>Recent Expenses</Text>
        <FlatList
          data={newExpenses.slice(-5).reverse()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <>
        <Text>{`${item.refnum} | ${item.date} | Php ${item.amount} | ${item.category} | ${item.notes}`}
            </Text>
            <Text>
                {item.photo && <Image source={{ uri: item.photo }} style={{ width: 100, height: 100 }} />}
            </Text>
            </>

            
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
  budget: { fontSize: 18, color: 'blue', marginBottom: 5 },
//   progress: { fontSize: 16, color: budgetProgress > 100 ? '#FF5252' : '#fff', marginBottom: 10 },
progress: { fontSize: 16, color: '#FF5252', marginBottom: 10 },
  noBudget: { fontSize: 16, color: '#fff', marginBottom: 10 },
  budgetInputContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  budgetInput: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    // backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#333',
  },
  header: { fontSize: 18, marginBottom: 10 },
//   listItem: { color: 'black', paddingVertical: 5 },
});