import React, {useEffect} from "react";
import { View, Text,StyleSheet, TouchableOpacity, Alert } from "react-native";
import {Divider,IconButton, List, Searchbar, Card,Button, Paragraph, Dialog, Portal,Provider } from 'react-native-paper';
import EntertainmentIcon from '../styles/icon/EntertainmentIcon.png'
import {db} from "../../database/firebase";



function serviceIcon(props,icon){
  return <List.Icon {...props} icon={icon}/>
    }


export default function ManageSubscriptions() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [user,setUser]= React.useState();
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);


  const addSubscription = () =>{
    // db.collection("users").doc("test1").set({username:"test1",password:"test1",
    //   services:[
    //     {Service:"Netflix",packages:10,Category:"Entertainment"},
    //     {Service:"Prime Video",packages:5,Category:"Entertainment"}]})
    // .then(() => {
    //   console.log("Document successfully written!");
    // })
    // .catch((error) => {
    //   console.error("Error writing document: ", error);
    // });
    var docRef = db.collection("users").doc("test1");

    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  useEffect(()=>{
    var docRef = db.collection("users").doc("test1");

    docRef.get().then((doc) => {
      if (doc.exists) {
        setUser(doc.data())
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  },[]);
  const deleteService = () =>
      Alert.alert("Button for deleting service (TODO!)");


  const onChangeSearch = query => setSearchQuery(query)
  return(
        <View style={styles.container}>
          <View style={{marginTop:15}}>
            <Text style={styles.text}>Managesss Subscriptions Page</Text>
          <Searchbar
              style={styles.searchBar}
              inputContainerStyle={styles.searchText}
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}/>
          </View>
          {user && user.services.map(service =>(
              <View key={service.username}>
              <Card.Title
                  title={service.Service}
                  titleStyle={{color:"white"}}
                  subtitleStyle={{color:"white"}}
                  subtitle={service.Category}
                  right={props => <IconButton {...props} icon="square-edit-outline" color={"white"} onPress={showDialog}/>}
              />
              <Divider style={styles.divider}/>
              </View>

          ))
          }
          <TouchableOpacity style={styles.button} onPress={addSubscription}>
            <Text style={styles.buttonText}>Add Subscription</Text>
          </TouchableOpacity>
          <Provider>
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Alert</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>This is simple dialog</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog}>Done</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </Provider>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#22343C',
    height:"100%"
  },
  text: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonText: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
  },
  button: {
    height: 48,
    overflow: 'hidden',
    backgroundColor: '#40DF9F',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
  },
  searchBar:{
    height:60,
    backgroundColor: '#1A282F',
    color:"#FFFFFF",
    marginTop:10,
    marginLeft:'10%',
    marginRight:'10%',
  },
  divider:{
    color:"white"
  }
});
