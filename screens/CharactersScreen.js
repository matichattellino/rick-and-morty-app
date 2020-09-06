import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image, TextInput } from "react-native";
import { gql, useQuery } from '@apollo/client';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements'
import filter from 'lodash.filter';

const Characters = ( { navigation }) => {
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ chars, setChars ] = useState([]);

      let query = gql`
      query($page:Int!, $filter: FilterCharacter) {
          characters(page:$page, filter: $filter){
              info{ 
                  count
                  pages
                  next
                  prev
              }
              results{
                  name
                  id
                  image
                  type
                 gender
                 species
              }
          }
      }
    ` 

  

  const { data, loading, error, fetchMore} = useQuery(query, {
    variables: { page: 1 },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network'
  }); 
  

  const characterData = data ? data['characters']['results'] : [];
  const { pages, next, prev, count } = data ? data['characters']['info'] : {};
  //const characters = !data ? [] : data.characters.results; 

  console.log(next)
  console.log(prev)
  console.log(pages)


  useEffect(() => {
    const results = !searchTerm || searchTerm.length <= 3 ? 
    characterData 
    : characterData.filter(characters =>
        characters.name.toString().toLowerCase().includes(searchTerm) ||
        characters.type.toString().toLowerCase().includes(searchTerm)
    );
    setChars(results);
  }, [searchTerm, data]);

  const renderSeparator = () => {
      return (
          <View
              style={styles.separator}
          >
          </View>
      )
  } 
  
  const paginate = ()  => 
    fetchMore({
        variables: { page: characterData.length / 20 + 1 },
        updateQuery: (previousResult, { fetchMoreResult }) => {  
         
          //Don't do anything if there weren't any new items
          if (!fetchMoreResult) return previousResult;
       
          return {
            characters: {
              __typename: "Characters",
              info: {
                count,
                next,
                pages,
                prev
              },
              results: [
                ...previousResult.characters.results,
                ...fetchMoreResult.characters.results
              ]
            }
          }
        },
  });
  console.log(data);

  return (
    <View style={styles.center}>
        <View>
          <SearchBar
            value={searchTerm}
            onChangeText={searchTerm => setSearchTerm(searchTerm)}
            round
            onClear={() => setSearchTerm("")}
        /> 
        </View>
        <FlatList
            data={chars}
            keyExtractor={({ id }) => id}  
            onEndReached={paginate}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => {
              return (
                  <TouchableOpacity
                     onPress={() => navigation.navigate("CharactersDetails" , 
                          { data: item }
                     )}
                  >
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
                  </TouchableOpacity>
                
              )
            }}
            
            ItemSeparatorComponent={renderSeparator}
        /> 
    </View>
  );
};

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
});
export default Characters;