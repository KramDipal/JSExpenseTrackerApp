import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert, ImageBackground } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-picker/picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


// const firebaseContextStore = useContext(FirebaseContextStore);
import { DBContextStore } from '../dbContext';
import { Camera, CameraView } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons'; // For camera icon
import { LinearGradient } from 'expo-linear-gradient';
// import CameraScreenComp from './CameraScreen';

export default function AddExpenseScreen({ setExpenses, expenses }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(null);
  const [note, setNote] = useState('');

  //camera
  const [photoUri, setPhotoUri] = useState(null); // Store photo URI
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const cameraRef = useRef(null);

//   const dbcontextStore = useContext(DBContextStore);
    const { handleSaveTask } = useContext(DBContextStore);

  
//   const categories = [
//     { label: 'Food', value: 'Food' },
//     { label: 'Transport', value: 'Transport' },
//     { label: 'Entertainment', value: 'Entertainment' },
//     { label: 'Bills', value: 'Bills' },
//   ];

  // Request camera permission on mount
    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        setPhotoUri(photo.uri); // Save the photo URI
        setCameraVisible(false); // Hide camera after capture
        }
    };

  const addExpense = () => {
    if (!amount){
      Alert.alert('Please enter amount');
      return;
    }  
      
    if(!category){
      Alert.alert('Please select a category');
      return;
    }

    
    const newExpense = {
      id: `EXP-${uuidv4().slice(0, 8)}`, // e.g., EXP-12345678
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      amount: parseFloat(amount),
      category,
      note,
      photo: photoUri || null, // Include photo URI if captured
    };

    //add to table the new record
    
    // const addRecord = dbcontextStore.handleSaveTask(newExpense)
    // console.log("addRecord " + JSON.stringify(addRecord));
    handleSaveTask(newExpense);
    setExpenses([...expenses, newExpense]);
    setAmount('');
    setCategory(null);
    setNote('');
    setPhotoUri(null); // Reset photo after saving
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <LinearGradient
    colors={['#0288D1', '#FFFDE4']} // Green gradient for Add Expense
    style={styles.gradient}
    >
    {/* <ImageBackground 
      source={require('../assets/logo/icon.jpg')} 
      resizeMode="stretch"
      style={styles.container}
    > */}
    <View style={styles.container}>
      {cameraVisible ? (
        <CameraView 
               ref={cameraRef} 
               style={styles.camera} 
               facing="back"
           >
          <View style={styles.cameraButtonContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <Ionicons name="camera" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setCameraVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          
          <Picker
            // style={styles.picker}
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            itemStyle={styles.itemStyle}
          >
            <Picker.Item label="Select Category" value={''} />
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Transportation" value="Transport" />
            <Picker.Item label="Entertainment" value="Entertainment" />
            <Picker.Item label="Bills" value="Bills" />
            <Picker.Item label="Others" value="Others" />
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Note (optional)"
            value={note}
            onChangeText={setNote}
          />
          {photoUri && 
            <Text style={styles.photoText}>Photo captured: {photoUri}</Text>}
          <TouchableOpacity
            style={styles.cameraIcon}
            onPress={() => setCameraVisible(true)}
          >
            <Ionicons name="camera-outline" size={30} color="#6200EE" />
            <Text style={styles.cameraText}>Add Photo</Text>
          </TouchableOpacity>
          <Button title="Add Expense" onPress={addExpense} />
        </>
      )}
    </View>
    </LinearGradient>
    // </ImageBackground>
  );
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5, fontWeight: 'bold' },
    gradient: { flex: 1 },
    picker: {
        // height: 50,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: '#FFFDE4',
        shadowColor: '#e1bb3e',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 10,
      },
      itemStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFFDE4',
      },
      message: {
        textAlign: 'center',
        paddingBottom: 10,
      },
      camera: {
        flex: 1,
      },
      buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
      },
      button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
      },
      text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
      },
      cameraButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
      },
      cameraButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
      },
      captureButton: {
        backgroundColor: '#6200EE',
        borderRadius: 50,
        padding: 15,
      },
      cameraText: { color: 'black', marginLeft: 10, fontSize: 16 },
      photoText: { color: '#333', marginVertical: 10, fontWeight: 'bold',},
      cancelButton: { marginTop: 10 },
      cancelText: { color: '#fff', fontSize: 16 },
      cameraIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      },
  });
  
