import React from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground,Image, TextInput, Button, TouchableOpacity, Modal, Alert, Dimensions, ScrollView } from 'react-native';

import { useContext, useState, useRef, useEffect } from 'react';

import { DBContextStore } from '../dbContext';
import { LinearGradient } from 'expo-linear-gradient';


import {
  BarChart,
  PieChart,
  StackedBarChart,
} from 'react-native-chart-kit';

import { Ionicons } from '@expo/vector-icons'; // For camera icon

const screenWidth = Dimensions.get('window').width;
export default function DashboardScreen({ expenses }) {
//   const totalSpending = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const dbcontextStore = useContext(DBContextStore);
  const  { newExpenses, budgetGoal, handleSaveBudget }  = useContext(DBContextStore);
  const [budgetInput, setBudgetInput] = useState('');
  const scrollViewRef = useRef(null);

  // console.log('DashboardScreen newExpenses ' + JSON.stringify(newExpenses));
  // Calculate total from newExpenses instead of props.expenses
  const totalSpending = newExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  const budgetProgress = budgetGoal ? (totalSpending / budgetGoal) * 100 : 0;

  //image blow up
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ selectedImage, setSelectedImage ] = useState(null);

  //dashboard
  const [ modalVisibleChart, setModalVisibleChart ] = useState(false);
  const imageWidth = screenWidth * 0.3;
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ autoScroll, setAutoScroll]  = useState(true);
  // const [ modalVisibleBarChart, setModalVisibleBarChart ] = useState(false);

  // const [selectRecordCounts, setSelectRecordCounts] = useState(
  //   new Array(newExpenses.length).fill(0) // Initialize counts as 0 for each index
  // );

  const [images] = useState([
    require('../assets/insurance/bdoi.png'),
    require('../assets/insurance/pioneer.png'),
    require('../assets/insurance/prudential.jpg'),
    require('../assets/insurance/prulife.jpg'),
    require('../assets/insurance/standard.png'),
    require('../assets/insurance/sunlife.png'),
    require('../assets/insurance/oona.png'),
    require('../assets/insurance/philbrit.png'),

  ]);

  useEffect(() => {
    if (!autoScroll) return;
    let index = 0;
    const totalImages = images.length;

    const scrollInterval = setInterval(() => {
      index = (index + 1) % totalImages;
      const scrollX = index * imageWidth;
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: scrollX, animated: true });
        setCurrentIndex(index);
      }
    }, 1000);

    return () => clearInterval(scrollInterval);
  }, [autoScroll, images, imageWidth]);

  
    const saveBudget = () => {
    if (budgetInput) {
      handleSaveBudget(budgetInput);
      setBudgetInput('');
    }
    else{
      Alert.alert('Please enter a budget');
      return;
    }
  };

  const handleImagePress = (photo) => {
    // Alert.alert('Image Pressed', `You clicked on image #${index + 1}`);
    // Alert.alert('Image Pressed ' + index + photo);
    setSelectedImage(photo);    
    setModalVisible(true);
    // You can replace this with any action, e.g., navigation or custom logic
  };

  // Step 1: Group by category and count occurrences
  const categoryCount = newExpenses.reduce((occurrences, item) => {
    occurrences[item.category] = (occurrences[item.category] || 0) + 1;
    return occurrences;
  }, {});


  // Step 2: Convert to pie chart format
  const pieData = Object.entries(categoryCount).map(([name, population], index) => ({
    name, // Category name (e.g., "Transport", "Entertainment", "Bills")
    population, // Count of occurrences
    color: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'][index], // Assign distinct colors
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  })).filter(item => item.population > 0); // Only include categories with counts

    // console.log('pieData ' + pieData);

  const handleChart = () => {

    console.log('handleChart');
    setModalVisibleChart(true);

  }



  return (
    <LinearGradient 
      // colors={['#0288D1', '#4FC3F7']} 
      colors={['#0288D1', '#FFFDE4']}
      style={styles.gradient}>

      {/* <View style={styles.buttonChart}>
        <TouchableOpacity
          onPress={handleChart}
        >
          <Ionicons name="trending-up" size={30} color="white" />
          {/* <Text style={{color:'red', fontWeight:'bold', fontSize:'20'}}>
            Chart
          </Text> */}

        {/* </TouchableOpacity>
      </View> */}


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
          <TouchableOpacity
              onPress={saveBudget}
          >
            <Ionicons name="save" size={30} color="white" />
          </TouchableOpacity>

          {/* <Button title="Save Budget" onPress={saveBudget}/> */}
        </View>
      
        <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>
          Insurance
        </Text>

        <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >

            {images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImagePress(index)}
                activeOpacity={0.8} // Slight fade effect on press
              >
                <Image
                  source={image}
                  style={[styles.image, { width: imageWidth }]}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={{fontSize:20, fontWeight:'bold',}}>
          For you
          </Text>


      {/* 02-28-25 start*/}
        <Text style={styles.header}>Recent Expenses</Text>
        <LinearGradient
            colors={['#005AA7', '#FFFDE4']} // Green gradient for Add Expense
            style={styles.gradient}
        >

          {/* {/* Flatlist start */}
        <FlatList
        style={styles.flatListStyle}
          data={newExpenses.slice(-20).reverse()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <>
            <Text style={{margin:10, fontSize:15}}>{`${item.refnum} | ${item.date} | Php ${item.amount} | ${item.category} | ${item.notes}`}
            </Text>

            <TouchableOpacity
              key={item.id}
              onPress={()=>handleImagePress(item.photo)}
            >
            <Text style={{margin:10}}>
                {item.photo &&
                  <Image source={{ uri: item.photo }} style={{ width: 100, height: 100 }} />
                }

                {item.photo ? <Image source={{ uri: item.photo }} style={{ width: 100, height: 100 }} /> : <Text style={{fontWeight:'bold'}}>Image not available: ({item.refnum})</Text>}
            </Text>
            </TouchableOpacity>
            </>   
          )}
        />
        {/* flatlist end */}
        </LinearGradient>
        {/* 02-28-25 end*/}

        <Modal visible={modalVisible} transparent onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
            
            {selectedImage ? <Image source={{uri: selectedImage}} style={styles.fullImage} />
            : <Text style={{fontWeight:'bold', fontSize:30, marginTop:50, color:'white'}}>Image not available</Text>}
          </View>
        </Modal>



        {/* chart */}
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleChart}
        onRequestClose={() => setModalVisibleChart(false)}
        >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Expense Breakdown</Text>
            {pieData.length > 0 ? (
              <PieChart
                data={pieData}
                width={screenWidth - 100}
                height={220}
                chartConfig={{
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            ) : (
              <Text>No selections yet</Text>
            )}
            <Button
              title="Close"
              onPress={()=> setModalVisibleChart(false)}
              color="#4CAF50" // Green for submit
              // onPress={() => setModalVidCountVisible(false)}
            />
          </View>
        </View>
      </Modal>


      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
gradient: { flex: 1, borderRadius: 10, },
  container: { flex: 1, padding: 20 },
  total: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 30 },
  budget: { fontSize: 18, color: 'blue', marginBottom: 5 },
//   progress: { fontSize: 16, color: budgetProgress > 100 ? '#FF5252' : '#fff', marginBottom: 10 },
progress: { fontSize: 16, color: '#FF5252', marginBottom: 10 },
  noBudget: { fontSize: 16, color: '#fff', marginBottom: 10 },
  budgetInputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20,
    // borderRadius: 2,
    // flex:1,
  },
  budgetInput: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    // backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: 'black',
    fontSize: 18,
  },
  header: { fontSize: 25, marginBottom: 10, color: '#FF5252' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalClose: {
    position: 'absolute',
    top: 150,
    right: 20,
  },
  fullImage: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.9 * (100 / 100), // Maintain aspect ratio
    borderRadius: 10,
  },
  closeText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonChart: {
    position: 'absolute',
    // top: 10,
    right: 20,
    fontSize: 18,
    fontWeight:'bold',
    marginTop: 10,
    color:'red'    
  },
  dashboard: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    width: screenWidth - 40,
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  dashboardItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: screenWidth - 60,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalItem: {
    fontSize: 16,
    marginVertical: 5,
  },    
  flatListStyle: {
    // height: 50,
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    // marginVertical: 10,
    // backgroundColor: '#97B5DE',
    shadowColor: '#e1bb3e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,    
  },
  image: {
    height: 90,
    marginHorizontal: 5,
    borderRadius: 10,
  },

});