import React from 'react';
import { StyleSheet, Text, View , ActivityIndicator} from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation'
import * as firebase from 'firebase'

export default class LoadinScreen extends React.Component {

    static navigationOptions = {
        title: "Loading",
        header:null
    };

    componentDidMount(){
        
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.props.navigation.replace('Home')
            } else {
                this.props.navigation.replace('Signin')
            }
        })
    }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='red'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
