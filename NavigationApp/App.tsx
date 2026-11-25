import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Page({ title }: { title: string }) {
  return (
    <View style={{ flex: 1,
     justifyContent: 'center',
      alignItems: 'center'
       }}>
      <Text style={{ fontSize: 25 }}>
        {title} Screen
        </Text>
    </View>
  );
}

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
       name="Home" 
       component={Home} />  
      <Tab.Screen 
      name="Settings" 
      component={Settings} />
    </Tab.Navigator>
  );
}

const Home = () => <Page title="Home" />;
const Settings = () => <Page title="Settings" />;
const Profile = () => <Page title="Profile" />;
const About = () => <Page title="About" />;

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen 
        name="Home Tabs" 
        component={Tabs} 
        />
        <Drawer.Screen 
        name="Profile" 
        component={Profile} 
        />
        <Drawer.Screen 
        name="About" 
        component={About}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
//cd fai/NavigationApp
// npm install
//npx expo start 