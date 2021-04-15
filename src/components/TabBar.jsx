// // import React from 'react';
// // import {Text, Title, Card, Headline} from "react-native-paper";
// // import {View} from "react-native"
//
// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
//
// const TabBar = ({descriptors, state, navigation}) => {
//   return (
//     <View style={{borderRadius: "20px 20px 0px 0px", flexDirection: 'row',backgroundColor:"#30444E",height:90,justifyContent:"center",alignItems:"center" }}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;
//
//         const isFocused = state.index === index;
//
//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//           });
//
//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };
//
//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };
//
//         if (index !== 0) {
//           return (
//             <TouchableOpacity
//               key={index}
//               accessibilityRole="button"
//               accessibilityStates={isFocused ? ['selected'] : []}
//               accessibilityLabel={options.tabBarAccessibilityLabel}
//               testID={options.tabBarTestID}
//               onPress={onPress}
//               onLongPress={onLongPress}
//               style={{ flex: 1, alignItems:"center" }}
//             >
//               <Text style={{ color: isFocused ? '#FFFFFF' : '#222' }}>
//                 {label}
//               </Text>
//             </TouchableOpacity>
//           );
//         }
//         else {
//           return (
//             <TouchableOpacity
//               key={index}
//               accessibilityRole="button"
//               accessibilityStates={isFocused ? ['selected'] : []}
//               accessibilityLabel={options.tabBarAccessibilityLabel}
//               testID={options.tabBarTestID}
//               onPress={() => navigation.openDrawer()}
//               style={{ flex: 1, alignItems:"center", backgroundColor: '#30444E' }}
//             >
//               <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
//                 {label}
//               </Text>
//             </TouchableOpacity>
//           )
//         }
//
//       })}
//     </View>
//   );
// };
//
// export default TabBar;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Card, IconButton } from 'react-native-paper';


const goHome = () =>
Alert.alert("Go Home Button");

export default function TabBar(){
    return(
        <View style={{flex: 1}}>
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
                <Card style={styles.bar}>
                    <Card.Content style={{flexDirection: 'row'}}>

                        <IconButton icon='menu' style={styles.button} />
                        <IconButton icon='home' style={styles.homeButton} onPress={goHome} />
                        <IconButton icon='account' style={styles.button} />

                    </Card.Content>
                </Card>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
  button: {
    height: '100%',
    width: '12%',
    overflow: 'hidden',
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 50,
    marginRight: 10
    },

  homeButton: {
    height: '100%',
    width: '12%',
    overflow: 'hidden',
    backgroundColor: '#40DF9F',
    borderRadius: 100,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 50,
    marginRight: 10
  },

  bar: {
    borderRadius: 20,
    height: 90,
    left: '0%',
    right: '0%',
    top: '0%',
    bottom: '0%',
    backgroundColor: '#30444E'
    }
});
