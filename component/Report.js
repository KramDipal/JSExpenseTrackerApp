import { DBContextStore } from '../dbContext';
import { useContext, useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export default function GenerateReport (){
  const dbcontextStore = useContext(DBContextStore);
  const  { newExpenses, newExpenses2 }  = useContext(DBContextStore);

    console.log('GenerateReport component' + JSON.stringify(newExpenses));

    return(
        <>
            <Text style={styles.title}>miExpense Report - February 2025</Text>      
      <View style={styles.section}>
        <Text style={styles.text}>Total Expenses: ${newExpenses.reduce((sum, exp) => sum + exp.amount, 0)}</Text>
      </View>


      <View style={styles.section}>
        <Text style={styles.text}>Expense Details:</Text>
        {newExpenses.map((exp, index) => (
          <Text key={index} style={styles.text}>
            {exp.category}: ${exp.amount} on {exp.date}
          </Text>
        ))}
      </View>
        
        </>

    )

}


const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      padding: 20,
    },
    section: {
      marginBottom: 10,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
    },
  });