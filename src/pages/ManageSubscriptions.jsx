import React, {useEffect} from "react";
import {ScrollView, View, Text,StyleSheet, TouchableOpacity, Alert } from "react-native";
import {Divider,IconButton, List, Searchbar, Card,Button,Title, Paragraph, Dialog, Portal,Provider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import EntertainmentIcon from '../styles/icon/EntertainmentIcon.png'
import {db} from "../../database/firebase";



function serviceIcon(props,icon){
  return <List.Icon {...props} icon={icon}/>
    }


export default function ManageSubscriptions({navigation}) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [user,setUser]= React.useState();
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);


  const addSubscription = () =>navigation.navigate('AddSubscription');

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
        <ScrollView style={styles.container}>
          <View style={{marginTop:15}}>
            <Text style={styles.text}>Manage Subscriptions Page</Text>
          <Searchbar
              style={styles.searchBar}
              inputContainerStyle={styles.searchText}
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}/>
          </View>
          {user && user.services.map(user =>(
            <View key={user.username}>
            <Card.Title
            title={user.Service}
            titleStyle={{color:"white"}}
            subtitleStyle={{color:"white"}}
            subtitle={user.Category}
            right={props => <IconButton {...props} icon="square-edit-outline" color={"white"} onPress={showDialog}/>}
            />
            <Divider style={styles.divider}/>
            </View>
          ))
          }
          <TouchableOpacity style={styles.button} onPress={addSubscription}>
            <LinearGradient
                style={{flex:1}}
                colors={['#9FC6FF', '#6993FF', '#516AC2']}
                height={'100%'}>
            <Title style={styles.buttonText}>Add Subscription</Title>
            </LinearGradient>
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
        </ScrollView>
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
    color: "white"
  },
  button: {
    height: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30
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
