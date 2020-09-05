import React from "react";
import { View, Button, Text, StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/HomeScreen';
import CharactersScreen from './screens/CharactersScreen'
import LocationScreen from './screens/LocationScreen'
import EpisodesScreen from './screens/EpisodesScreen'
import { AppRegistry } from 'react-native'
import { ApolloProvider,ApolloClient, InMemoryCache } from '@apollo/client';
import CharacterDetailsScreen from './screens/CharactersDetailScreen';
import LocationDetailScreen from './screens/LocationsDetailScreen';
import EpisodesDetailScreen from './screens/EpisodesDetailScreen';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
});


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    return (
                <Tab.Navigator initialRouteName="Locations">
                    <Tab.Screen name="Characters" component={CharactersScreen} />
                    <Tab.Screen name="Locations" component={LocationScreen} />
                    <Tab.Screen name="Episodes" component={EpisodesScreen} />
                </Tab.Navigator>       
    );
};

const StackNavigation = () => {
  return (
      <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Layout" component={BottomTabNavigation} />
          <Stack.Screen name="CharactersDetails" component={CharacterDetailsScreen} />
          <Stack.Screen name="LocationDetails" component={LocationDetailScreen} />
          <Stack.Screen name="EpisodesDetails" component={EpisodesDetailScreen} />
      </Stack.Navigator>
  )
}
  
const App = () => {
  return (
    <ApolloProvider client={client}>
        <NavigationContainer>
            <StackNavigation />
        </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;