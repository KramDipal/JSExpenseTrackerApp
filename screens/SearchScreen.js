
import React, {useState} from 'react';
import { Text, View, FlatList, TouchableOpacity, Button, StyleSheet, Image, Modal, Dimensions, TextInput, Pressable } from "react-native";
import { DBContextStore } from '../dbContext';
import { useContext, useEffect } from "react";
import { Searchbar } from 'react-native-paper';

import { LinearGradient } from 'expo-linear-gradient';

import { AppStyle } from '../constants';

const screenWidth = Dimensions.get('window').width;
export default function SearchScreen(){
    const dbcontextStore = useContext(DBContextStore);
    const  { newExpenses,  newExpenses2 }  = useContext(DBContextStore);
    const [searchQuery, setSearchQuery] = useState('');
    //image blow up
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ selectedImage, setSelectedImage ] = useState(null);

    const handleSearchEvent = async (text) => {
        console.log('handleSearchEvent, searchQuery:', searchQuery);
        await dbcontextStore.fetchByRecord(dbcontextStore.db, searchQuery); // Pass searchQuery
        console.log('handleSearchEvent newExpenses2:', JSON.stringify(newExpenses2, null, 2));
    };


    const handleImagePress = (photo) => {
        setSelectedImage(photo);    
        setModalVisible(true);

      };

          //  load on mount
      useEffect(() => {
        handleSearchEvent(searchQuery);
      }, [searchQuery]);


    return(
        <LinearGradient
          colors={['#0288D1', '#FFFDE4']}
          style={styles.gradient}
        >
        <View>
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
                <View style={styles.searchContent}>
                    <TextInput
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Enter a value"
                        style={{ backgroundColor:'#DDDDDD', width:'95%', margin:10, borderRadius:5 }}
                    />
                    {/* <Pressable
                        onPress={handleSearchEvent}           
                        style={styles.button}         
                    >
                        <Text>Search</Text>
                    </Pressable>     */}
                </View>

        <FlatList
        // style={styles.flatListStyle}
          data={newExpenses2.slice(-50).reverse()}
            // data={newExpenses2}
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
                {item.photo ? <Image source={{ uri: item.photo }} style={{ width: 150, height: 150 }} /> : <Text style={{fontWeight:'bold'}}>Image not available: ({item.refnum})</Text>}
            </Text>
            </TouchableOpacity>
            </>   
          )}
        />
        </View>

        <Modal visible={modalVisible} transparent onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
        
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalClose}>
              <Text style={styles.closeText}>Close</Text>              
            </TouchableOpacity>
            {selectedImage ? <Image source={{uri: selectedImage}} style={styles.fullImage} />
            : <Text style={{fontWeight:'bold', fontSize:30, marginTop:50, color:'white'}}>Image not available</Text>}
            
          </View>
        </Modal>
        </LinearGradient>
    )

}


const styles = StyleSheet.create({

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
      gradient: { flex: 1, borderRadius: 10, },
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
      closeText: {
        color: '#fff',
        fontSize: 18,
      },
      fullImage: {
        width: screenWidth * 0.9,
        height: screenWidth * 0.9 * (100 / 100), // Maintain aspect ratio
        borderRadius: 10,
      },
      searchContent:{
        paddingVertical:5,
        borderBottomColor:AppStyle.gunMetal,
        borderBottomWidth:2,
        flexDirection:'row',
    },
    button:{        
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        margin:10,
    },
})