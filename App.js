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

import { StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

import DBcreateContextProvider from './dbContext';

// import InitDB from './database/initDB';
import miExpenseIcon from './assets/logo/icon.jpg';
const Tab = createBottomTabNavigator();

export default function App() {
  const [expenses, setExpenses] = useState([]); // Central state for expenses

  return (
    // <InitDB>
    <DBcreateContextProvider>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="miExpense" 
                options={{
                  // tabBarLabel: null,
                  tabBarIcon: ({color,size})=> (
                  <Ionicons name="home" color={color} size={size}/>
                  // <Image
                  //   source={miExpenseIcon}
                  //   style={{ width: size, height: size, tintColor: color }} // Adjust size and color
                  //   resizeMode="contain" // Ensures proper scaling
                  // />
                ),
                // headerRight: () => ()
                headerRight: () => (
                  <TouchableOpacity           
                    onPress={()=>Alert.alert('About:',
                      'Developed by: mfl3genA7i company',
                      [                     
                        {
                          text: 'Connect with US: +639175736952',
                          // onPress: () => Linking.openURL('https://miexpense.com'),
                          style: 'cancel',
                        },
                        {
                          text: 'Yes',
                          // onPress: () => handledeleteRecord(id),
                          
                        },

                      ],
                      { cancelable: true }
                     
                    )}
                  >
                    <Ionicons 
                      name="information-circle-outline" 
                      size={40} color="black" 
                      style={{marginRight:20}}
                    />


                  </TouchableOpacity>

                  // <Image
                  //   source={miExpenseIcon}
                  //   style={{width:80, height:80, marginLeft:150}} // Custom style for header
                  //   resizeMode="contain"
                  // />
                ),
                
                }}>
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