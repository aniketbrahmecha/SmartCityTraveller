import React, { useContext,useState } from 'react';
import { StyleSheet, Text,View, FlatList,ScrollView, TouchableOpacity,Image } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import { Context } from '../context/AuthContext';
import * as precaution from '../localJson/Precautions';
import * as description from '../localJson/Description';
import images from '../localJson/Yogas';
import Spacer from '../components/Spacer';
import {Button,Overlay} from 'react-native-elements';

const Item = ({prec}) => {
   return(
   <ListItem
   containerStyle = {{
     marginVertical : 5,
     borderRadius : 10,
     marginHorizontal : 5
   }}
  friction={90} 
  tension={100} 
  activeScale={0.95}
>
  <ListItem.Content>
    <ListItem.Title style={{ color: 'red', fontWeight: 'bold' }}>
      {prec}
    </ListItem.Title>
  </ListItem.Content>
</ListItem>
)
}
const PredictedDisease =()=>{

    const {state, predictDisease } =useContext(Context);
    const precautions = Object.values(precaution[state])
    const descriptions = Object.values(description[state])
    const yogas = images[state]
    const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

    return (
    <ScrollView>
        <Text style = {{textAlign : 'center' , fontFamily : 'sans-serif' , fontSize : 25 , marginVertical : 10}}> You are likely to have {state} </Text>
        <Spacer />
        <Button 
          title = "Open Description"
          onPress={toggleOverlay}
        />
        <Overlay 
          isVisible={visible} 
          overlayStyle = {{height: 550}}
         onBackdropPress={toggleOverlay}>
        <Text style = {{fontSize : 25, textAlign : 'center' ,fontFamily : 'sans-serif'}}>{state} Description</Text>
        <Spacer />
        <Text style = {{fontSize : 20 }} >{descriptions}</Text>
      </Overlay>
       <Spacer />

        <Text style = {{fontSize : 25, fontFamily : 'sans-serif' , textAlign : 'center'}}> Precautions </Text>
        
        <FlatList
        data={precautions}
        keyExtractor={precautions => precautions}
        renderItem={({ item }) => {
          return (
            <Item 
                prec = {item}
            />
          );
        }}
      />


      <FlatList
        horizontal 
        data={yogas}
        //keyExtractor={precautions => yogas}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <Image 
              source = {item}
              style={{ width: 100, height: 100 , borderRadius : 20 , marginHorizontal : 5}}
            />
          );
        }}
      />
      <Spacer />
    </ScrollView>
    )
};

export default PredictedDisease;