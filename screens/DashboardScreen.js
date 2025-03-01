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

import { Video } from 'expo-av';

const screenWidth = Dimensions.get('window').width;
export default function DashboardScreen({ expenses }) {

  const videoRef = useRef(null);
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

  const [ modalVisibleArticles, setModalVisibleArticles ] = useState(false);
  const [ selectedImageArticles, setSelectedImageArticles ] = useState(null);
  //dashboard
  const [ modalVisibleChart, setModalVisibleChart ] = useState(false);
  const imageWidth = screenWidth * 0.3;
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ autoScroll, setAutoScroll]  = useState(true);

  //select video to play
  const [ imagePressedIndex, setImagePressedIndex ] = useState(0);

  //modal about
  // const [ modalVisibleAbout, setModalVisibleAbout ] = useState(null)
  // const [ modalVisibleBarChart, setModalVisibleBarChart ] = useState(false);

  // const [selectRecordCounts, setSelectRecordCounts] = useState(
  //   new Array(newExpenses.length).fill(0) // Initialize counts as 0 for each index
  // );

  const [images] = useState([
    require('../assets/insurance/bdoi.png'),
    require('../assets/insurance/sunlife.png'),
    require('../assets/insurance/pioneer.png'),
    require('../assets/insurance/prudential.jpg'),
    require('../assets/insurance/prulife.jpg'),
    require('../assets/insurance/standard.png'),
    require('../assets/insurance/oona.png'),
    require('../assets/insurance/philbrit.png'),
  ]);

  const [articles] = useState([
    require('../assets/savings/bank.jpg'),
    require('../assets/savings/hdmf.jpg'),
    require('../assets/savings/stocks.png'),    
    require('../assets/savings/sss.png'),  
    require('../assets/savings/ph.jpg'),  
  ]);

  const [videoMap] = useState([    
    require('../assets/videos/BDOLifeVid.mp4'),
    require('../assets/videos/SunLifeVid.mp4'),
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

  // const handleImagePress = (photo) => {
  //   // Alert.alert('Image Pressed', `You clicked on image #${index + 1}`);
  //   // Alert.alert('Image Pressed ' + index + photo);
  //   setSelectedImage(photo);    
  //   setModalVisible(true);
  //   // You can replace this with any action, e.g., navigation or custom logic
  // };

  // Step 1: Group by category and count occurrences
  // const categoryCount = newExpenses.reduce((acc, item) => {
  //   acc[item.category] = (acc[item.category] || 0) + 1;
  //   return acc;
  // }, {});


  // Step 2: Convert to pie chart format
  // const pieData = Object.entries(categoryCount).map(([name, population], index) => ({
  //   name, // Category name (e.g., "Transport", "Entertainment", "Bills")
  //   population, // Count of occurrences
  //   color: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'][index], // Assign distinct colors
  //   legendFontColor: '#7F7F7F',
  //   legendFontSize: 15,
  // })).filter(item => item.population > 0); // Only include categories with counts

    // console.log('pieData ' + pieData);

  // const handleChart = () => {

  //   console.log('handleChart');
  //   setModalVisibleChart(true);

  // }

  const handleImagePress = (index) => {
    // Alert.alert('Image Pressed', `You clicked on image #${index + 1}`);
    setSelectedImage(images[index]);
    setModalVisible(true);
    setImagePressedIndex(index); // for video selection
    // You can replace this with any action, e.g., navigation or custom logic
  };

  const handleImagePressArticles = (index) => {
    // Alert.alert('Image Pressed', `You clicked on image #${index + 1}`);
    setSelectedImageArticles(articles[index]);
    setModalVisibleArticles(true);
    // You can replace this with any action, e.g., navigation or custom logic
  };

  // const handleAboutPress = () => {
  //   setModalVisibleAbout(true);
  // }

  return (
    <LinearGradient 
      // colors={['#0288D1', '#4FC3F7']} 
      colors={['#0288D1', '#FFFDE4']}
      style={styles.gradient}>

        {/* <View style={{marginTop:15, marginBottom:20, position:'absolute', right: 20,}}>
          <TouchableOpacity
            onPress={handleAboutPress}
          > */}
          {/* <Ionicons name="information-circle-outline" size={40} color="black" />
          </TouchableOpacity>

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




        <View style={{marginBottom:5, flexDirection:'row'}}>
          <TouchableOpacity
                onPress={()=>Alert.alert('Savings for a dream car')}
                style={{marginHorizontal:25,}}
            >
              <Ionicons name="car-sport-outline" size={40} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
                onPress={()=>Alert.alert('Savings for a dream house')}
                style={{marginHorizontal:25,}}
            >
              <Ionicons name="home-outline" size={40} color="black" />
              
          </TouchableOpacity>

          <TouchableOpacity
                onPress={()=>Alert.alert('Savings')}
                style={{marginHorizontal:25,}}
            >
              <Ionicons name="wallet-outline" size={40} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
                onPress={()=>Alert.alert('Travel')}
                style={{marginHorizontal:25,}}
            >
              <Ionicons name="airplane-outline" size={40} color="black" />
          </TouchableOpacity>
          
        </View>



      {/* Articles */}
        <Text style={{fontSize:20, fontWeight:'bold', marginBottom:15}}>
          Articles
        </Text>
 
        <ScrollView
             horizontal
            showsHorizontalScrollIndicator={false}
           >

            {articles.map((articles, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImagePressArticles(index)}
                activeOpacity={0.8} // Slight fade effect on press
              >
                <Image
                  source={articles}
                  style={styles.imageArticles}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
   {/* Articles */}


        {/* <View style={{flexDirection:'row'}}> */}
          <Text style={{fontSize:20, fontWeight:'bold',}}>
            Insurance
          </Text>

          {/* <View style={styles.viewView}> */}

          {/* </View> */}
        {/* </View> */}


            {/* Insurance Image*/}
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
        {/* Insurance */}


        {/* insurance modal */}
        <Modal visible={modalVisible} transparent onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>            
            {/* <Image source={selectedImage} style={styles.fullImage} /> */}
            {videoMap.length >=  imagePressedIndex ? 
              <Video
                    ref={videoRef}
                    source={videoMap[imagePressedIndex]}
                    style={styles.video}
                    useNativeControls={true}
                    shouldPlay
                    isLooping={true}
                    resizeMode="contain"                
                    // onPlaybatrue}tusUpdate={handlePlaybackStatusUpdate}            
              /> : 
              <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>Video not available</Text>
            }
          </View>
        </Modal>
        {/* insurance modal */}

        {/* Articles modal */}
        <Modal visible={modalVisibleArticles} transparent onRequestClose={() => setModalVisibleArticles(false)}>
          <View style={styles.modalOverlay}>
            <TouchableOpacity onPress={() => setModalVisibleArticles(false)} style={styles.modalClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>            
            <Image source={selectedImageArticles} style={styles.fullImage} />
          </View>
        </Modal>
        {/* Articles modal */}



        {/* About modal */}
        {/* <Modal 
          visible={modalVisibleAbout} 
          transparent 
          onRequestClose={() => setModalVisibleAbout(false)}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity onPress={() => setModalVisibleAbout(false)} style={styles.modalClose}>
              <Text style={styles.closeText}>Close</Text>

            </TouchableOpacity>             */}
            {/* <Image source={selectedImageArticles} style={styles.fullImage} /> */}

            {/* <View style={{alignContent:'center', alignItems:'center'}}>
              <Text style={{color:'white', fontSize:20, marginBottom:20}}>Developed by: mfl3genA&i company</Text> */}
              {/* <Text style={{color:'white', fontSize:20, marginBottom:20}}>Version: 1.0.10</Text>
              <Text style={{color:'white', fontSize:20, marginBottom:20}}>Contact us: +639175736952</Text> */}
              {/* <Text style={{color:'white', fontSize:20, marginBottom:20}}>URL: www.mfl3genA&i.io</Text>
            </View>

          </View>
        </Modal> */}
        {/* About modal */}

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
gradient: { flex: 1,},
  container: { flex: 1, padding: 20, marginTop:20 },
  total: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 5 },
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
  scrollContainer: {
    alignItems: 'center',
    marginBottom: 70,
    marginTop:60
    // backgroundColor:'#ff2800',
  },
  imageArticles: {
    height: 60,
    width:60,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 65
  },
  video: {
    width: 400, // Full width minus padding
    height: 320, // 16:9 aspect ratio
    borderRadius: 10,
    // marginLeft:170

  },
  viewView:{
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10, // Number, not string
  },
  aboutStyle:{
    // marginVertical: 10, // Number, not string
  }

});