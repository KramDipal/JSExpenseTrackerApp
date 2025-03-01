import { Text, View, Modal, Image, StyleSheet, Dimensions, Button } from "react-native";
import { DBContextStore } from '../dbContext';
import { useContext } from "react";
import {
    BarChart,
    PieChart,
    StackedBarChart,
  } from 'react-native-chart-kit';

  import { Ionicons } from '@expo/vector-icons'; // For camera icon
import { LinearGradient } from "expo-linear-gradient";
const screenWidth = Dimensions.get('window').width;
export default function ChartsScreen(){
  const dbcontextStore = useContext(DBContextStore);
  const  { newExpenses, newExpenses2 }  = useContext(DBContextStore);

  // Step 1: Group by category and count occurrences
  const categoryCount = newExpenses.reduce((occurrences, item) => {
    occurrences[item.category] = (occurrences[item.category] || 0) + 1;
    return occurrences;
  }, {});


    // Step 1: Group by category and sum amounts
    const categoryTotals = newExpenses.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item.amount;
        return acc;
    }, {});


// Step 2: Format the output as "Category: Php Amount"
const formattedTotals = Object.entries(categoryTotals).map(([category, total]) => `${category}: Php ${total}`);

// Step 3: Display the results
// console.log(formattedTotals[0], formattedTotals[1]);

  // Step 2: Convert to pie chart format
  const pieData = Object.entries(categoryCount).map(([name, population], index) => ({
    name, // Category name (e.g., "Transport", "Entertainment", "Bills")
    population, // Count of occurrences
    color: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'][index], // Assign distinct colors
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  })).filter(item => item.population > 0); // Only include categories with counts


//    const dataBar = {
//     labels: ["Test1", "Test2"],
//     legend: ["L1", "L2", "L3"],
//     data: [
//       [60, 60, 60],
//       [30, 30, 60]
//     ],
//     barColors: ["#FF6384", "#36A2EB", "#FFCE56"]
//   };

    return(        
    <LinearGradient
    colors={['#0288D1', '#FFFDE4']} // Green gradient for Add Expense
    style={styles.gradient}
    >  
    <>
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
            {/* <Button
              title="Close"
              onPress={()=> setModalVisibleChart(false)}
              color="#4CAF50" // Green for submit
              // onPress={() => setModalVidCountVisible(false)}
            /> */}
          </View>
        </View>

        {/* <View style={styles.modalViewBar}>
                <StackedBarChart
                    // style={{margin:20}}
                    data={dataBar}
                    width='350'
                    height={250}
                    chartConfig={chartConfig}
                />

        </View> */}
        
        <View style={styles.modalViewBar}>
            <View style={{flexDirection:'row', }}>
            <Text style={{color:'blue', fontSize:20, marginBottom:20, marginLeft:30}}>Category:</Text>
                {/* <Text style={{color:'blue', fontSize:20, marginBottom:20, position: 'absolute', left:300}}>Total:</Text> */}
            </View>

            {/* Bills */}
            <View style={{flexDirection:'row'}}>
                {/* <Text style={{fontSize:20, marginBottom:10, marginLeft:30}}>Food: Php</Text> */}
                <Text style={{fontSize:20, marginLeft:30, color:'#4CAF50'}}>{formattedTotals[3]}</Text>
            </View>

            {/* Others */}
            <View style={{flexDirection:'row'}}>
                {/* <Text style={{fontSize:20, marginBottom:10, marginLeft:30}}>Transportation: Php</Text> */}
                <Text style={{fontSize:20, marginLeft:30, color:'#FF6384'}}>{formattedTotals[0]}</Text>
            </View>

            {/* Food */}
            <View style={{flexDirection:'row'}}>
                {/* <Text style={{fontSize:20, marginBottom:10, marginLeft:30}}>Entertainment: Php</Text> */}
                <Text style={{fontSize:20, marginLeft:30, color:'#36A2EB'}}>{formattedTotals[1]}</Text>
            </View>

            {/* Entetainment */}
            <View style={{flexDirection:'row'}}>
                {/* <Text style={{fontSize:20, marginBottom:60, marginLeft:30}}>Bill: Php</Text> */}
                <Text style={{fontSize:20, marginLeft:30, color:'#FDC830'}}>{formattedTotals[2]}</Text>
            </View>

            {/* Transportation */}
            <View style={{flexDirection:'row', marginBottom:60}}>
                {/* <Text style={{fontSize:20, marginBottom:60, marginLeft:30}}>Bill: Php</Text> */}
                <Text style={{fontSize:20, marginLeft:30, color:'black'}}>{formattedTotals[4]}</Text>
            </View>

        </View>
    </>
    </LinearGradient>

        
    )
}

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

const styles = StyleSheet.create({
    gradient: { flex: 1, borderRadius: 10,},
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: screenWidth - 60,
        alignItems: 'center',
      },
      modalViewBar: {
        // flex: 1,
        // margin:20,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // marginBottom: 10,
      },
      modalContentBar: {
        // backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: screenWidth - 60,
        alignItems: 'center',
      },
      
})