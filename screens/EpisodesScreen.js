import React, { useState, useEffect} from "react";
import { gql, useQuery } from '@apollo/client';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image, TextInput } from "react-native";
import { SearchBar } from 'react-native-elements';

const Episodes = ({ navigation }) => {
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ episode, setEpisode ] = useState([]);
 
  let query = gql`
        query($page:Int, $filter: FilterEpisode) {
        episodes(page:$page, filter:$filter){
            info{
            count
            pages
            next
            prev
            }
            results{
                id
                name
                episode
                air_date
                characters{
                name
                image
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

    const episodesData = data ? data['episodes']['results'] : [];
    const { pages, next, prev, count } = data ? data['episodes']['info'] : {};

    useEffect(() => {
      const results = !searchTerm || searchTerm.length <= 3 ? 
      episodesData
      : episodesData.filter(episodes =>
          episodes.name.toString().toLowerCase().includes(searchTerm) ||
          episodes.type.toString().toLowerCase().includes(searchTerm)
      );
      setEpisode(results);
    }, [searchTerm, data]);

  const paginate = ()  => 
    fetchMore({
        variables: { page: episodesData.length / 20 + 1 },
        updateQuery: (previousResult, { fetchMoreResult }) => {  
         
          //Don't do anything if there weren't any new items
          if (!fetchMoreResult) return previousResult;
       
          return {
            episodes: {
              __typename: "Episodes",
              info: {
                count,
                next,
                pages,
                prev
              },
              results: [
                ...previousResult.episodes.results,
                ...fetchMoreResult.episodes.results
              ]
            }
          }
        },
  });
  console.log(data);
  
    const renderSeparator = () => {
        return (
            <View
                style={styles.separator}
            >
            </View>
        )
    }   
    
    return (
        <View style={styles.center}>
          <View>
            <SearchBar
              value={searchTerm}
              onChangeText={searchTerm => setSearchTerm(searchTerm)}
              onClear={() => setSearchTerm("")}
          /> 
          </View>
          <FlatList
              data={episode}
              onEndReached={paginate}
              onEndReachedThreshold={0.5}
              //ListHeaderComponent={renderHeader}
              renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("EpisodesDetails" , 
                       { data: item }
                       )}
                    >
                      <View style={styles.cards}>
                          <View style={styles.cardText}>  
                            <Text style={styles.text}>
                              {item.name}
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
export default Episodes;