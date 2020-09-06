import React, { useState, useEffect} from "react";
import { gql, useQuery } from '@apollo/client';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image, TextInput } from "react-native";
import { SearchBar } from 'react-native-elements';

const Locations = ( { navigation } ) => {
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ locations, setLocations ] = useState([]);
 
  let query = gql`
      query($page:Int, $filter: FilterLocation) {
        locations(page:$page, filter:$filter){
            info{
                count
                pages
                next
                prev
        }
        results{
            name
            dimension
            type
            residents {
              image
              name
            }
        }
    }
    }
    `
     const { data, loading, error, fetchMore} = useQuery(query, {
      variables: { page: 1 },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network'
    });
    console.log(data);

    
    const locationData = data ? data['locations']['results'] : [];
    const { pages, next, prev, count } = data ? data['locations']['info'] : {};

    useEffect(() => {
      const results = !searchTerm || searchTerm.length <= 3 ? 
      locationData
      : locationData.filter(episodes =>
          episodes.name.toString().toLowerCase().includes(searchTerm) ||
          episodes.type.toString().toLowerCase().includes(searchTerm)
      );
      setLocations(results);
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
      variables: { page: locationData.length / 20 + 1 },
      updateQuery: (previousResult, { fetchMoreResult }) => {  
       
        //Don't do anything if there weren't any new items
        if (!fetchMoreResult) return previousResult;
     
        return {
          locations: {
            __typename: "Locations",
            info: {
              count,
              next,
              pages,
              prev
            },
            results: [
              ...previousResult.locations.results,
              ...fetchMoreResult.locations.results
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
              data={locations}
              //ListHeaderComponent={renderHeader}
              onEndReached={paginate}
              onEndReachedThreshold={0.5}
              renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("LocationDetails" , 
                      { item }
                      )}
                    >
                      <View style={styles.cards}>
                          <View style={styles.cardText}>  
                            <Text style={styles.text}>
                              {item.name}
                            </Text>
                            <Text>
                              {item.dimension}
                            </Text>
                          </View> 
                        </View>
                    </TouchableOpacity>
                  
                )
              }}
              keyExtractor={(item) => item.id}
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
export default Locations;