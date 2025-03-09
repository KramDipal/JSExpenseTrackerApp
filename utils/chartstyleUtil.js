

import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;

export const ChartStyleUtil = StyleSheet.create({
    gradient: { flex: 1, borderRadius: 10,},
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: screenWidth - 60,
        alignItems: 'center',
      },
      modalContentBar: {
        padding: 20,
        borderRadius: 10,
        width: screenWidth - 60,
        alignItems: 'center',
      },
      box: {
        fontWeight: 'bold',
        color: 'white',
        fontSize:20,
        width: '90%',
        height: 50,
        backgroundColor: '#4CAF50',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginLeft: 20,
        marginBottom:20,
        marginRight:20,
        
    },
      
})