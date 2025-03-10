import React, { useState, useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { DBContextStore } from '../dbContext';
import { LinearGradient } from 'expo-linear-gradient';

import { FilterStyleUtil } from '../utils/filterStyleUtil';

export default function FilterScreen({ expenses }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [timeFilter, setTimeFilter] = useState('Monthly');
  const  { newExpenses }  = useContext(DBContextStore);


  const categories = newExpenses ? [...new Set(newExpenses.map((exp) => exp.category))]
  : null; // Unique categories


  return (
    <LinearGradient
    colors={['#0288D1', '#FFFDE4']}
    style={FilterStyleUtil.gradient}
    >

    <View style={FilterStyleUtil.container}>
      <Text style={FilterStyleUtil.header}>Filter by Category</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Text
            style={[FilterStyleUtil.item, selectedCategory === item && FilterStyleUtil.selected]}
            onPress={() => setSelectedCategory(item)}
          >
            {item}
          </Text>
        )}
      />
      <Text style={FilterStyleUtil.header}>Time Filter</Text>
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

// const styles = StyleSheet.create({
//   gradient: { flex: 1 },
//   container: { flex: 1, padding: 20, marginBottom:20 },
//   header: { fontSize: 18, marginVertical: 10 },
//   item: { padding: 10, borderBottomWidth: 1 },
//   selected: { backgroundColor: '#e0e0e0' },
// });