import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useColorScheme} from 'react-native';

import {getAppColors} from '../utils/colors';
import {getAppStyles} from '../utils/styles';

import SettingsScreen from './settings/SettingsScreen';
import FavouriteMuseumsScreen from './FavouriteMuseumsScreen';
import SearchMuseumScreen from './SearchMuseumScreen';
import AllMuseumsScreen from './AllMuseumsScreen';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const {backgroundStyle} = getAppStyles(colorScheme);
  const {headerColor} = getAppColors(colorScheme);

  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarStyle: backgroundStyle,
        headerStyle: backgroundStyle,
        headerTintColor: headerColor,
      })}>
      <Tab.Screen
        name="All"
        component={AllMuseumsScreen}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchMuseumScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="search" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteMuseumsScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="bookmark-o" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color}) => <Icon name="cog" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
