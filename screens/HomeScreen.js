import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, FlatList } from 'react-native';
import {Input, Card, Button, Icon,Badge} from 'native-base'
import * as firebase from 'firebase'

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        title: "Chat",
        headerRight: (
            <Button warning rounded style={{margin:5}} icon onPress={() => {
                firebase.auth().signOut()
                .then(() => {console.log("Sign out");})
                .catch(error => alert(error.message));
            }}>
              <Icon name="md-key" />
            </Button>
        ),
    };

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            uid:"",
            message:'',
            messageList:[]
        };
    }
    
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    email: user.email,
                    name: user.displayName,
                    uid:user.uid
            });
            } else {
                this.props.navigation.replace("Signin");
            }
        });
    }

    componentWillMount(){
        var self = this;
    
        var messageListRef = firebase.database().ref('message_list')
        messageListRef.on('value', dataSnapshot => {
            if(dataSnapshot.val()) {
                let messageList = Object.values(dataSnapshot.val());
                self.updateList(messageList.reverse());
            }
        })
    }

    updateList = messageList => {
        this.setState({messageList:messageList})
    }

    sendMessage = (message) => {
        var messageListRef = firebase.database().ref('message_list')
        var newMessageRef = messageListRef.push()
        newMessageRef.set({
          text:message,
          time: Date.now(),
          uid:this.state.uid,
          name:firebase.auth().currentUser.displayName
        })
        this.setState({
          message:''
        })
      }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' enabled keyboardVerticalOffset={90}>
        <View style={styles.listContainer}>
          <FlatList data={this.state.messageList} inverted keyExtractor={(item,index)=>item.time.toString()}
          renderItem={({item})=>{
              if(item.uid == firebase.auth().currentUser.uid){
                  return(
                      <Card style={styles.listItem}>
                        <Text style={styles.messageText}>{item.text}</Text>
                      </Card>
                    )
              } else {
                    return(
                        <View style={{flexDirection:'row'}}>
                            <View style={{backgroundColor:'orange',borderRadius:50, padding:10, height:50,width:50,alignItems:'center'}}><Text style={{fontSize: 25,color:'#fff'}}>{item.name.charAt(0)}</Text></View>
                            <Card style={styles.listItemTheir}>
                                <Text style={styles.messageText}>{item.text}</Text>
                            </Card>
                        </View>
                    )
              }
          }}/>
        </View>
        <View style={styles.inputContainer}>
          <Input value={this.state.message} placeholder="Enter Message" onChangeText={text => {
              this.setState({ message: text });
          }}/>
          <Button danger rounded icon onPress={() => {
              this.sendMessage(this.state.message);
          }}>
            <Icon name="arrow-forward" />
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    margin: 2,
    backgroundColor: "#fff"
  },
  header: {
    backgroundColor: "#f4511e",
    alignItems: "center",
    height: 40,
    justifyContent: "center"
  },
  headerText: {
    paddingHorizontal: 10,
    color: "#fff",
    fontSize: 20
  },
  listContainer: {
    flex: 1,
    padding: 5
  },
  listItem: {
    padding: 10,
    flex:1,
    alignSelf:'flex-end',
    backgroundColor:'darkturquoise',
    borderRadius:15,
    flexDirection:'row'
  },
  messageText: {
    fontSize: 20,
  },
  timeText: {
    fontSize: 10
  },
  inputContainer: {
    flexDirection: "row",
    padding: 5,
    borderWidth: 5,
    borderRadius: 25,
    borderColor: "#EA7773",
    color: "#fff",
    borderColor:'#fd0759'
  },
  listItemTheir:{
      backgroundColor:'#EAF0F1',
      borderRadius:15,
      padding:10,
      alignSelf:'flex-start',
      flexDirection:'row',
      marginRight:100
  }
});
