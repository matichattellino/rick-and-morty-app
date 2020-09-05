import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import CharactersScreen from '../screens/CharactersScreen'
import LocationScreen from '../screens/LocationScreen'
import EpisodesScreen from '../screens/EpisodesScreen'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabNavigation = () => {
    return (
                <Tab.Navigator initialRouteName="Locations">
                    <Tab.Screen name="Characters" component={CharactersScreen} />
                    <Tab.Screen name="Locations" component={LocationScreen} />
                    <Tab.Screen name="Episodes" component={EpisodesScreen} />
                </Tab.Navigator>       
    );
};
export default BottomTabNavigation;