import React, {useEffect} from "react";
import {ScrollView, View, Text,StyleSheet, TouchableOpacity, Alert } from "react-native";
import {Avatar,Divider,IconButton, List, Searchbar, Card,Button,Title, Paragraph, Dialog, Portal,Provider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import EntertainmentIcon from '../styles/icon/EntertainmentIcon.png'
import MusicIcon from '../styles/icon/MusicIcon.png'
import GamingIcon from '../styles/icon/GamingIcon.png'
import OtherIcon from '../styles/icon/OtherIcon.png'
import {db,firebase} from "../../database/firebase";



function serviceIcon(props,icon){
  return <List.Icon {...props} icon={icon}/>
    }


export default function ManageSubscriptions({navigation}) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [user,setUser]= React.useState();
  const [visible, setVisible] = React.useState(false);
  const currentUser = firebase.auth().currentUser;

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);


  const addSubscription = () =>navigation.navigate('AddSubscription');

  useEffect(()=>{
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
        console.log(temp)
        // console.log("Document data:", doc.data());
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
          {/*<Searchbar*/}
          {/*    style={styles.searchBar}*/}
          {/*    inputContainerStyle={styles.searchText}*/}
          {/*    placeholder="Search"*/}
          {/*    onChangeText={onChangeSearch}*/}
          {/*    value={searchQuery}/>*/}
          </View>
          {user &&user.services && user.services.map(user =>(
            <View key={user.usernam}>
            <Card.Title
            title={user.Service+" - "+user.packages+"$"}
            titleStyle={{color:"white"}}
            subtitleStyle={{color:"white"}}
            subtitle={user.Category}
            left={(props) => <Avatar.Image {...props} source={user.icon} />}
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
