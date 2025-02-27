import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './screens/DashboardScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import FilterScreen from './screens/FilterScreen';
import ChartsScreen from './screens/ChartsScreen';
import SearchScreen from './screens/SearchScreen';

import { Ionicons } from '@expo/vector-icons'
// import { LinearGradient } from 'expo-linear-gradient';

import { StyleSheet } from 'react-native';

import DBcreateContextProvider from './dbContext';

// import InitDB from './database/initDB';

const Tab = createBottomTabNavigator();

export default function App() {
  const [expenses, setExpenses] = useState([]); // Central state for expenses

  return (
    // <InitDB>
    <DBcreateContextProvider>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" 
                options={{
                  tabBarIcon: ({color,size})=> (
                  <Ionicons name="home" color={color} size={size}/>
                )}}>
          {() => <DashboardScreen expenses={expenses} />}
        </Tab.Screen>

        <Tab.Screen name="Add Expense"
                options={{
                  tabBarIcon: ({color,size})=> (
                  <Ionicons name="add-circle" color={color} size={size}/>
                )}}>
          {() => <AddExpenseScreen setExpenses={setExpenses} expenses={expenses} />}
        </Tab.Screen>

        <Tab.Screen name="Filters"
                options={{
                  tabBarIcon: ({color,size})=> (
                  <Ionicons name="list" color={color} size={size}/>
                )}}>
          {() => <FilterScreen expenses={expenses} />}
        </Tab.Screen>

        <Tab.Screen name="Board"
                options={{
                  tabBarIcon: ({color,size})=> (
                  <Ionicons name="trending-up" color={color} size={size}/>
                )}}>
          {() => <ChartsScreen expenses={expenses} />}
        </Tab.Screen>

        <Tab.Screen name="Search"
                options={{
                  tabBarIcon: ({color,size})=> (
                  <Ionicons name="search" color={color} size={size}/>
                )}}>
          {() => <SearchScreen expenses={expenses} />}
        </Tab.Screen>

      </Tab.Navigator>
    </NavigationContainer>   
    </DBcreateContextProvider>
   
    // </InitDB>
  );
}





const styles = StyleSheet.create({

  // background:{
  //   flex:1,
  //   alignItems:'center',
  //   justifyContent:'center',
  //   width:'100%',
  //   colors={'#00ffe985','#ff8383','#001d6e'},
  //   start={x:0.2,y:0.2},
  //   end={x:0.7,y:0.8}, 


})