import React, {useEffect, useState} from "react";
import { View, Text,StyleSheet, TouchableOpacity, Alert } from "react-native";
import { List,Searchbar} from 'react-native-paper';


function serviceIcon(props,icon){
  return <List.Icon {...props} icon={icon}/>
    }

export default function ManageSubscriptions() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [services,setServices]= React.useState([]);

  useEffect(()=>{
    setServices(["Netflix","Prime Video"])
  },[])

  const onChangeSearch = query => setSearchQuery(query)
  return(
        <View style={styles.container}>
          <View style={{marginTop:15}}>
            <Text style={styles.text}>Manage Subscriptions Page</Text>
          <Searchbar
              style={styles.searchBar}
              inputContainerStyle={styles.searchText}
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}/>
          </View>
        <View>
          {services.map(service =>(
              <List.Item
                  style={styles.serviceList}
                  title={service}
                  description="services"
                  left={props => serviceIcon(props,'folder')}
                  right={props => <List.Icon {...props} icon="delete"/>}
              />
          ))
          }
        </View>
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
  searchBar:{
    height:60,
    backgroundColor: '#1A282F',
    color:"#FFFFFF",
    marginTop:10,
    marginLeft:'10%',
    marginRight:'10%',
  },
  searchText:{
    color:"#FFFFFF"
  },
  serviceList:{
    color:"#FFFFFF"
  }
});
