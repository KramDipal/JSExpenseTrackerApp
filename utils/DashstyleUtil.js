
import { StyleSheet, Dimensions } from "react-native"



const screenWidth = Dimensions.get('window').width;

export const DashStyleUtil = StyleSheet.create({
    gradient: { flex: 1,},
    container: { flex: 1, padding: 20,},
    total: { fontSize: 25, fontWeight: 'bold', marginBottom: 20, marginTop: 5 },
    budget: { fontSize: 18, color: 'blue', marginBottom: 5 },
    progress: { fontSize: 16, color: '#FF5252', marginBottom: 10 },
    noBudget: { fontSize: 16, color: '#fff', marginBottom: 10 },
    budgetInputContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 20,
      },
      budgetInput: {
        flex: 1,
        borderWidth: 1,
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
        color: 'black',
        fontSize: 18,
      },
      imageArticles: {
        height: 60,
        width:60,
        marginHorizontal: 10,
        borderRadius: 10,
        marginBottom: 65
      },
      scrollContainer: {
        alignItems: 'center',
        marginBottom: 70,
        marginTop:60
      },
      dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
      },
      dot: {
        width: 12,
        height: 12,
        borderRadius: 5,
        marginHorizontal: 5,
        marginBottom: 10
      },
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalClose: {
        position: 'absolute',
        top: 100,
        right: 25,
      },
      closeText: {
        color: '#fff',
        fontSize: 18,
      },
      video: {
        width: 400, // Full width minus padding
        height: 320, // 16:9 aspect ratio
        borderRadius: 10,    
      },
      modalClose: {
        position: 'absolute',
        top: 100,
        right: 25,
      },
      fullImage: {
        width: screenWidth * 0.9,
        height: screenWidth * 0.9 * (100 / 100), // Maintain aspect ratio
        borderRadius: 10,
      },
      image: {
        height: 90,
        marginHorizontal: 5,
        borderRadius: 10,
      },
})