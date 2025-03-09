
import { StyleSheet } from "react-native";


export const AddStyleUtil = StyleSheet.create({
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
  
