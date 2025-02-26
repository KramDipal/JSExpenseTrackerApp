import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-picker/picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


// const firebaseContextStore = useContext(FirebaseContextStore);
import { DBContextStore } from '../dbContext';
// import * as SQLite from 'expo-sqlite';


export default function AddExpenseScreen({ setExpenses, expenses }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(null);
  const [note, setNote] = useState('');

//   const dbcontextStore = useContext(DBContextStore);
    const { handleSaveTask } = useContext(DBContextStore);

  
  const categories = [
    { label: 'Food', value: 'Food' },
    { label: 'Transport', value: 'Transport' },
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Bills', value: 'Bills' },
  ];

  const addExpense = () => {
    if (!amount || !category) return;
    const newExpense = {
      id: `EXP-${uuidv4().slice(0, 8)}`, // e.g., EXP-12345678
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      amount: parseFloat(amount),
      category,
      note,
    };

    //add to table the new record
    
    // const addRecord = dbcontextStore.handleSaveTask(newExpense)
    // console.log("addRecord " + JSON.stringify(addRecord));
    handleSaveTask(newExpense);
    setExpenses([...expenses, newExpense]);
    setAmount('');
    setCategory(null);
    setNote('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      {/* <RNPickerSelect
        onValueChange={(value) => setCategory(value)}
        items={categories}
        placeholder={{ label: 'Select Category', value: null }}
        style={pickerStyles}
        useNativeAndroidPickerStyle={false}
      /> */}
      <Picker
        selectedValue={category}
        onValueChange={(itemValue, itemIndex) =>
            setCategory(itemValue)
        }>
        <Picker.Item label="Food" value="Food" />
        <Picker.Item label="Transport" value="Transport" />
        <Picker.Item label="Entertainment" value="Entertainment" />
        <Picker.Item label="Bills" value="Bills" />
      </Picker>
        
      <TextInput
        style={styles.input}
        placeholder="Note (optional)"
        value={note}
        onChangeText={setNote}
      />
      <Button title="Add Expense" onPress={addExpense} />
    </View>
  );
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  });
  
  const pickerStyles = {
    inputIOS: { ...styles.input, height: 50 },
    inputAndroid: { ...styles.input, height: 50 },
  };