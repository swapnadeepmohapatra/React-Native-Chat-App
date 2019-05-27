import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation'

import * as firebase from 'firebase'

import HomeScreen from './screens/HomeScreen'
import ChatScreen from './screens/ChatScreen'
import LoadingScreen from './screens/LoadingScreen'
import SigninScreen from './screens/SigninScreen'
import SignupScreen from './screens/SignupScreen'

firebase.initializeApp({
  apiKey: "AIzaSyCywu6HIrYNr-04SkuqSQiLiLoRAYxzTsg",
  authDomain: "reactnativechatapp-7fd26.firebaseapp.com",
  databaseURL: "https://reactnativechatapp-7fd26.firebaseio.com",
  projectId: "reactnativechatapp-7fd26",
  storageBucket: "reactnativechatapp-7fd26.appspot.com",
  messagingSenderId: "976885959854",
  appId: "1:976885959854:web:4e0891e0133e08a9"
});

const MainNavigator = createStackNavigator({
  Home:{screen:HomeScreen},
  Chat:{screen:ChatScreen},
  Loading:{screen:LoadingScreen},
  Signin:{screen:SigninScreen},
  Signup:{screen:SignupScreen},
},{
  initialRouteName:'Loading',
  defaultNavigationOptions:{
    headerTintColor:'#fff',
    headerStyle: {
      backgroundColor: "#fd0759"
    },
}})

const App = createAppContainer(MainNavigator)
export default App