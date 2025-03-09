
import React, {useState} from 'react';
import { Text, View, FlatList, TouchableOpacity, Button, StyleSheet, Image, Modal, Dimensions, TextInput, Pressable, Alert } from "react-native";
import { DBContextStore } from '../dbContext';
import { useContext, useEffect } from "react";
import { Searchbar } from 'react-native-paper';

import { LinearGradient } from 'expo-linear-gradient';

import { AppStyle } from '../constants';
import Toast from 'react-native-root-toast';

import { Ionicons } from '@expo/vector-icons'; // For camera icon

import GenerateReport from '../component/Report';
import { SearchUtilStyle } from '../utils/searchStyleUtil';

const screenWidth = Dimensions.get('window').width;
export default function SearchScreen(){
    const dbcontextStore = useContext(DBContextStore);
    const  { newExpenses,  newExpenses2 }  = useContext(DBContextStore);

    const[ newList, setNewList ] = useState(newExpenses2);

    const [searchQuery, setSearchQuery] = useState('');
    //image blow up
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ selectedImage, setSelectedImage ] = useState(null);
    const [refreshing,setRefreshing] = useState(false);

    //report generation
    const [modalVisibleReport, setModalVisibleReport] = useState(false);

    

        //for deleted records
    const handlePressDelete = (id, refnum) =>{
      console.log("handlePressDelete " + id);


        Alert.alert(
            'Delete Record',
            `Are you sure you want to delete this record #${id} with Ref # ${refnum}`,
            [
              {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () => handledeleteRecord(id),
                
              },
            ],
            { cancelable: true }
        );

    }

    
    const handledeleteRecord = async (id) => {
      await dbcontextStore.deleteRecord(id);
      setNewList((prevItems) => prevItems.filter((item) => item.id !== id));
      // Toast.show('Record delete');
    }

    const handleSearchEvent = async (text) => {
        // console.log('handleSearchEvent, searchQuery:', searchQuery);
        await dbcontextStore.fetchByRecord(dbcontextStore.db, searchQuery); // Pass searchQuery
        // setNewList(newExpenses2);
        // console.log('handleSearchEvent newExpenses2:', JSON.stringify(newExpenses2, null, 2));
        // console.log('handleSearchEvent newExpenses2:', JSON.stringify(newExpenses2, null, 2));

    };

    // console.log('handleSearchEvent newExpenses2 start :', JSON.stringify(newExpenses2, null, 2));
    // console.log('handleSearchEvent newList start :', JSON.stringify(newList, null, 2));

    const handleImagePress = (photo) => {
        setSelectedImage(photo);    
        setModalVisible(true);

      };

      //  load on mount or in every Textinput onChange event
      useEffect(() => {
        handleSearchEvent(searchQuery);
      }, [searchQuery]);

      //  load on mount or in every change in  newExpenses2
      useEffect(() => {
         setNewList(newExpenses2); // Update state with fetched data
      }, [newExpenses2]);

      //reload data on refresh
      const onRefresh = async()=>{
        setRefreshing(true)
          await dbcontextStore.fetchByRecord(dbcontextStore.db, searchQuery).then(()=>{            setRefreshing(false)
        });
    }

    const handleGenerateReport = () => {
      console.log('handleGenerateReport ' + JSON.stringify(newList));
      setModalVisibleReport(true);
    }


    return(
        <LinearGradient
          colors={['#0288D1', '#FFFDE4']}
          style={SearchUtilStyle.gradient}
        >
        <View>
        {/* <GenerateReport report={newList}/> */}
            {/* <Searchbar
            style={{marginTop:10, marginBottom:20}}
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            onIconPress={handleSearchEvent}
            /> */}
            {/* <TouchableOpacity onPress={handleSearchEvent}>
                <Text style={{fontSize:50}}>Search</Text>
            </TouchableOpacity> */}
                <View style={SearchUtilStyle.searchContent}>
                    <TextInput
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Enter a value"
                        style={{ backgroundColor:'#DDDDDD', width:'80%',height:45, margin:10, borderRadius:5, paddingLeft:10 }}
                    />
                    <TouchableOpacity
                      onPress={()=>handleGenerateReport()}
                      style={{marginTop:10}}
                    >
                      {/* {modalVisibleReport && <GenerateReport/>} */}
                      {/* {modalVisibleReport && <Text>Close</Text>} */}

                      <Ionicons name="reader-outline" size={40} color="black" />
                    </TouchableOpacity>

                    {/* <Pressable
                        onPress={handleSearchEvent}           
                        style={styles.button}         
                    >
                        <Text>Search</Text>
                    </Pressable>     */}
                </View>
        
        {/* Flat list Start */}
        <FlatList
        
          data={newList.slice(-10).reverse()}
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <>

              <View style={SearchUtilStyle.box}>
                <Text style={{margin:10, fontSize:15}}>{`${item.refnum} | ${item.date} | Php ${item.amount} | ${item.category} | ${item.notes}`}
                </Text>

                <View style={{flexDirection:'row'}}>
                  <TouchableOpacity
                    key={item.id}
                    onPress={()=>handleImagePress(item.photo)}
                  >
                  <Text style={{margin:10}}>
                      {item.photo ? <Image source={{ uri: item.photo }} style={{ width: 120, height: 120 }} /> : <Text style={{fontWeight:'bold'}}>Image not available: ({item.refnum})</Text>}
                  </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                      onPress={()=>handlePressDelete(item.id, item.refnum)}
                      style={{position:'absolute', right: 20,}}
                      >
                      <Ionicons name="trash-outline" size={30} color="red" />
                  </TouchableOpacity>
                </View>


                {/* <Button onPress={()=>handlePressDelete(item.id)}
                  title='Delete'
                  /> */}
              </View>

            </>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
        {/* flat list *End */}
        </View>



        <Modal visible={modalVisible} transparent onRequestClose={() => setModalVisible(false)}>
          <View style={SearchUtilStyle.modalOverlay}>
        
            <TouchableOpacity 
              onPress={() => setModalVisible(false)} 
              style={SearchUtilStyle.modalClose}
              // onBlur={()=>setModalVisible(false)}
            >
              <Text style={SearchUtilStyle.closeText}>Close</Text>              
            </TouchableOpacity>
            {selectedImage ? <Image source={{uri: selectedImage}} style={SearchUtilStyle.fullImage} />
            : <Text style={{fontWeight:'bold', fontSize:20, marginTop:50, color:'white'}}>Image not available</Text>}
            
          </View>
        </Modal>
      </LinearGradient>
    )

}


// const styles = StyleSheet.create({

//     flatListStyle: {
//         // height: 50,
//         borderWidth: 2,
//         borderColor: 'gray',
//         borderRadius: 10,
//         // marginVertical: 10,
//         // backgroundColor: '#97B5DE',
//         shadowColor: '#e1bb3e',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//         elevation: 10,    
//       },
//       gradient: { flex: 1, borderRadius: 10, },
//       modalOverlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.8)',
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
//       modalClose: {
//         position: 'absolute',
//         top: 110,
//         right: 25,
//       },
//       closeText: {
//         color: '#fff',
//         fontSize: 18,
//       },
//       fullImage: {
//         width: screenWidth * 0.9,
//         height: screenWidth * 0.9 * (50 / 50), // Maintain aspect ratio
//         borderRadius: 10,
//       },
//       searchContent:{
//         paddingVertical:5,
//         borderBottomColor:AppStyle.gunMetal,
//         borderBottomWidth:2,
//         flexDirection:'row',
//     },
//     button:{        
//         alignItems: 'center',
//         backgroundColor: '#DDDDDD',
//         padding: 10,
//         margin:10,
//     },
//     box: {
//       width: '90%',
//       padding: 10,
//       marginVertical: 10,
//       // backgroundColor: '#0288D1',
//       borderWidth: 1,
//       borderColor: '#dddddd',
//       borderRadius: 10,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 4,
//       elevation: 2,
//       marginLeft: 20,
//   },
// })