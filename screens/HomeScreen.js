import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";


const Home = ( { navigation }) => {
  return (
    <View style={styles.center}>
      <Text style={{marginBottom: 10, color: "#3b3a30" }}>React Native Challenge</Text>
      <Text>MATIAS CHATTELLINO</Text>
      <View style={styles.button}>
      <Button 
        color = "black"
        title="go to characters"
       onPress={() => navigation.navigate('Layout')}
      />  
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  center: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    textAlign: "center",
  },
  button: {
    flex: 1,
    paddingTop: 400
  }
});


export default Home;