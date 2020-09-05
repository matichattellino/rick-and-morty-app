import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/HomeScreen';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CharactersScreen from '../screens/CharactersScreen'
import LocationScreen from '../screens/LocationScreen'
import EpisodesScreen from '../screens/EpisodesScreen'

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
        </Stack.Navigator>
    )
}

export default StackNavigation;

