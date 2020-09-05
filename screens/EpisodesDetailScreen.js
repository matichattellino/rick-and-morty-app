import React from 'react';
import { View, Image, StyleSheet, Text, FlatList } from 'react-native';

const LocationDetailScreen = (item) => {
    const {  id, name, episode, air_date, characters } = item.route.params.data;

    const renderSeparator = () => {
        return (
            <View
                style={styles.separator}
            >
            </View>
        )
    } 
  
    return ( 
        <View>
            <View style={{alignItems: "center", paddingTop: 3}}>
                <Text style={{ color: "green", fontSize: 25}}>
                    {name}
                </Text>
            </View>
            <Text style={{fontSize: 20}}>
                Release: {air_date}
            </Text>
            <Text style={{fontSize: 20}}>
                Episode: {episode}
            </Text>
            <FlatList
                data={characters.slice(0,5)}
                //ListHeaderComponent={renderHeader}
                renderItem={({ item }) => {
                return (
                        <View style={styles.cards}>
                            <Image 
                                style={styles.image} 
                                source={{ uri: item.image}} 
                            />
                            <View style={styles.cardText}>  
                            <Text style={styles.text}>
                                {item.name}
                            </Text>
                            </View> 
                        </View>  
                )
                }}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={renderSeparator}
        /> 
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        backgroundColor: "#F5FCFF"
      },
      cards: {
        flex: 1,
        flexDirection: "row",
        marginBottom: 3
      },
      image: {
        width: 80,
        height: 80,
        margin: 5
      },
      cardText: {
        flex:1,
        justifyContent:"center",
        marginLeft: 5
      },
      text: {
        fontSize: 18, 
        color: "green",
        marginBottom: 15
      },
      separator: {
        height: 1,
        width: "100%",
        backgroundColor: "black"
      }
})
 
export default LocationDetailScreen;