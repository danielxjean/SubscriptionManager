import React, {useEffect,useState} from "react";
import {ScrollView, View, Text,StyleSheet,TextInput, TouchableOpacity, Alert } from "react-native";
import {Avatar,Divider,IconButton, List, Searchbar, Card,Button,Title, Paragraph, Dialog, Portal,Provider,RadioButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import ModalDropdown from 'react-native-modal-dropdown';
import EntertainmentIcon from '../styles/icon/EntertainmentIcon.png'
import MusicIcon from '../styles/icon/MusicIcon.png'
import GamingIcon from '../styles/icon/GamingIcon.png'
import OtherIcon from '../styles/icon/OtherIcon.png'
import {db,firebase} from "../../database/firebase";





export default function ManageSubscriptions({navigation}) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [user,setUser]= React.useState();
  const [currService,setCurrService]= React.useState('');
  const [value, setValue] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [monthlyCost, setMonthlyCost] = React.useState('');
  const [deleteService, setDeleteService] = React.useState([]);
  const [packages, setPackages] = React.useState([10]);
  const currentUser = firebase.auth().currentUser;

  const showDialog = () => {setVisible(true)};

  const hideDialog = () => setVisible(false);


  const addSubscription = () =>navigation.navigate('AddSubscription');

  useEffect(()=>{
    fetchData()
  },[]);

  const fetchData = async =>{
    var docRef = db.collection("users").doc(currentUser.uid);

    docRef.get().then((doc) => {
      if (doc.exists) {
        let temp=doc.data();
        for(var i=0;i<temp.services.length;i++)
        {
          if(temp.services[i].Category==0) {
            temp.services[i].Category = "Entertainment"
            temp.services[i].icon=EntertainmentIcon
          }
          if(temp.services[i].Category==1) {
            temp.services[i].Category = "Music"
            temp.services[i].icon = MusicIcon
          }
          if(temp.services[i].Category==2) {
            temp.services[i].Category = "Gaming"
            temp.services[i].icon = GamingIcon
          }
          if(temp.services[i].Category==3) {
            temp.services[i].Category = "Other"
            temp.services[i].icon = OtherIcon
          }
        }
        setUser(temp)
        // console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  const setChosenPackage = (choice)=>setMonthlyCost(packages[choice]);

  const updateMonthlyCost = ()=>{
    var docRef = db.collection("users").doc(currentUser.uid);
    docRef.get().then((doc) => {
      if (doc.exists) {
        let temp=doc.data();
        for(var i=0;i<temp.services.length;i++)
          if(temp.services[i].Service==currService)
            temp.services[i].packages=parseFloat(monthlyCost)
        firebase.firestore().collection('users').doc(currentUser.uid).set(temp).then(()=>fetchData())
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
    hideDialog()
  }

  const deleteCurrService = ()=>{
    var docRef = db.collection("users").doc(currentUser.uid);
    docRef.get().then((doc) => {
      if (doc.exists) {
        let temp=doc.data();
        for(var i=0;i<temp.services.length;i++)
          if(temp.services[i].Service==currService)
            firebase.firestore()
            .collection('users')
            .doc(currentUser.uid)
            .update({
              services: firebase.firestore.FieldValue.arrayRemove(temp.services[i]),
            }).then(()=>fetchData())
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
    hideDialog()
  }
  const onChangeSearch = query => setSearchQuery(query)
  return(
        <ScrollView style={styles.container}>
          <View style={{marginTop:15}}>
            <Text style={styles.text}>Manage Subscriptions Page</Text>
          </View>
          {user &&user.services && user.services.map(user =>(
            <View key={user.usernam}>
            <Card.Title
            title={user.Service+" - "+user.packages+"$"}
            titleStyle={{color:"white"}}
            subtitleStyle={{color:"white"}}
            subtitle={user.Category}
            left={(props) => <Avatar.Image {...props} source={user.icon} />}
            right={props => <IconButton {...props} icon="square-edit-outline" color={"white"} onPress={()=>{setDeleteService(user);setCurrService(user.Service);showDialog();}}/>}
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
                <Dialog.Title>Edit {currService}</Dialog.Title>

                <Dialog.ScrollArea style={{justifyContent: 'center',alignItems:'center'}}>
                  <ScrollView>
                    <View style={{flex:1}}>
                      <TextInput
                          style={styles.input}
                          placeholder='Monthly cost'
                          keyboardType='numeric'
                          placeholderTextColor="white"
                          onChangeText={(text) => setMonthlyCost(text)}
                          value={monthlyCost}
                          underlineColorAndroid="transparent"
                          autoCapitalize="none"
                      />
                    </View>
                  </ScrollView>
                </Dialog.ScrollArea>
                <Dialog.Actions>
                  <Button onPress={deleteCurrService}>Delete</Button>
                  <Button onPress={updateMonthlyCost}>Done</Button>
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
  },
  input: {
    height: 48,
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: '#1A282F',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 16,
    paddingRight:16,
    color: 'white',
    borderColor: 'black'
  },
});
