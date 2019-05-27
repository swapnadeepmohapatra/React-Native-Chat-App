import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Image,ScrollView } from 'react-native';
import * as firebase from 'firebase'
import {Form,Item,Input,Label,Button} from 'native-base'

export default class SignupScreen extends React.Component {

    constructor(props){
        super(props)
        this.state={
            name:'',
            email:'',
            password:''
        }
    }

    static navigationOptions={
        title:'Sign Up',
    }

    signupUser = (name,email,password) => {
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(user => {
            return user.user.updateProfile({displayName:name})
            .then(this.props.navigation.replace('Home'))
            .catch(error=>alert(error.message))
        })
        .catch(error=>alert(error.message))
    }


  render() {
    return (
        
        <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')}style={{width:100,height:100}}/>
          <Text>LearnCodeOnline</Text>
        </View>  
        <View>
          <Form style={styles.form}>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input autoCorrect={false} autoCapitalize='words' keyboardType='name-phone-pad' onChangeText={name => {
              this.setState({name})
              }}/>
            </Item>
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
                this.signupUser(this.state.name, this.state.email, this.state.password)
            }}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </Button>
          </Form>
          <View style={styles.footer}>
            <Text>OR</Text>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate("Signin");
            }}>
              <Text>Already having an Account ?</Text>
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
      width: "100%"
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