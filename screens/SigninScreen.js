import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Image,ScrollView } from 'react-native';
import * as firebase from 'firebase'
import {Form,Item,Input,Label,Button} from 'native-base'

export default class SigninScreen extends React.Component {

    static navigationOptions = {
        title: "Sign In",
    };

    constructor(props){
        super(props)
        this.state={
            email:'',
            password:''
        }
    }

    signInUser = (email,password) => {
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(() => {
            this.props.navigation.replace('Home')
        })
        .catch(error => alert(error.message))
    }

  render() {
    return (
        <ScrollView>
      <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')} style={{width:150,height:150}}/>
          <Text>Chat App</Text>
        </View>  
        <View>
          <Form style={styles.form}>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input autoCorrect={false} autoCapitalize='none' keyboardType='email-address' onChangeText={email => {
              this.setState({email})
              }}/>
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input secureTextEntry={true} autoCorrect={false} autoCapitalize='none' keyboardType='default' onChangeText={password => {
              this.setState({password})
              }}/>
            </Item>
            <Button style={styles.button} full rounded onPress={()=>{
              this.signInUser(this.state.email,this.state.password)
            }}>
              <Text style={styles.buttonText}>Sign In</Text>
            </Button>
          </Form>
          <View style={styles.footer}>
            <Text>OR</Text>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate("Signup");
            }}>
              <Text>Create a new Account ?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    logoContainer: {
      alignItems: "center",
      marginTop: 100,
      marginBottom: 100
    },
    form: {
      padding: 20,
      width: "100%",
      marginBottom: 30
    },
    button: {
      marginTop: 20,
      backgroundColor:'#ffcb2b',
    },
    buttonText: {
      color: "#000"
    },
    footer: {
      alignItems: "center"
    }
  });
  