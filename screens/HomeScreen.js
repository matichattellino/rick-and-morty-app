import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";


const Home = ( { navigation }) => {
  return (
    <View style={styles.center}>
      <Text>This is the home screen</Text>
      <Button 
        title="go to characters"
       onPress={() => navigation.navigate('Layout')}
      />  
    </View>
  );
};


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});


export default Home;