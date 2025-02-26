import React, { useState, useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { DBContextStore } from '../dbContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function FilterScreen({ expenses }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [timeFilter, setTimeFilter] = useState('Monthly');
  const  { newExpenses }  = useContext(DBContextStore);


//   const categories = [...new Set(expenses.map((exp) => exp.category))]; // Unique categories
    const categories = [...new Set(newExpenses.map((exp) => exp.category))]; // Unique categories


  return (
    <LinearGradient
    colors={['#FF5722', '#FF8A65']} // Orange gradient for Filters
    style={styles.gradient}
    >
    <View style={styles.container}>
      <Text style={styles.header}>Filter by Category</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Text
            style={[styles.item, selectedCategory === item && styles.selected]}
            onPress={() => setSelectedCategory(item)}
          >
            {item}
          </Text>
        )}
      />
      <Text style={styles.header}>Time Filter</Text>
      <Button
        title="Weekly"
        onPress={() => setTimeFilter('Weekly')}
        color={timeFilter === 'Weekly' ? 'blue' : 'gray'}
      />
      <Button
        title="Monthly"
        onPress={() => setTimeFilter('Monthly')}
        color={timeFilter === 'Monthly' ? 'blue' : 'gray'}
      />
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, padding: 20 },
  header: { fontSize: 18, marginVertical: 10 },
  item: { padding: 10, borderBottomWidth: 1 },
  selected: { backgroundColor: '#e0e0e0' },
});