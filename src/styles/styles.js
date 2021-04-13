import { StyleSheet } from "react-native";

// THIS IS A TEMPLATE, CHANGES-LE AU BESOIN
export default StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    text: {
      color: "white",
      fontSize: 42,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000a0"
    },
    button: {
      backgroundColor: '#000000a0',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 15       
   }
  });