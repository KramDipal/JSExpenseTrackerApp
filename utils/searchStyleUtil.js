
import { StyleSheet, Dimensions } from "react-native"
import { AppStyle } from "../constants";

const screenWidth = Dimensions.get('window').width;
export const SearchUtilStyle = StyleSheet.create({

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
            top: 110,
            right: 25,
          },
          closeText: {
            color: '#fff',
            fontSize: 18,
          },
          fullImage: {
            width: screenWidth * 0.9,
            height: screenWidth * 0.9 * (50 / 50), // Maintain aspect ratio
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
        box: {
          width: '90%',
          padding: 10,
          marginVertical: 10,
          // backgroundColor: '#0288D1',
          borderWidth: 1,
          borderColor: '#dddddd',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
          marginLeft: 20,
    }

})