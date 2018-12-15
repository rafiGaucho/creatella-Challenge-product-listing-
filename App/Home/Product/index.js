import React, { Component } from 'react';
import {
  View,Dimensions,
  StyleSheet,Text
} from 'react-native';
const heightScreen= Dimensions.get('window').height/26;

export const Product=(props)=>{

  let  item=props.item;
    //seperate date and time
  let  date=item.date.split(' ');
    //seperate hour min and sec
  let  time=date[4].split(':')
    //create date in differnt format which allows comparison
  let  dataNew=new Date(item.date)

  let value=false;let diffDays=null;
    //if date of product is < date b4 a week
  if(dataNew<props.date){
     value=true //shows date
  }
  // shows no.of days ago by comparing product date and todays date
  if(value === false){
     let timeDiff=Math.abs(dataNew-props.dateToday)
      diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // no.of days ago
    }
  return (
    <View style={[{display:'flex',height:heightScreen*10,width:'50%',
        backgroundColor:'white',justifyContent:'center',
        alignItems:'center',borderWidth:5,borderColor:'#f7f1e3'}]}>

      <View style={{flex:2,flexDirection:'row'}}>
       <View style={{flex:2}}></View>
       <View style={{flex:1,backgroundColor:'#2ed573',alignItems:'center',justifyContent:'center'}}>
        <Text style={{color:'white',fontSize:14,fontWeight:'600'}}>Size {item.size}</Text>
       </View>
      </View>

      <View style={{flex:5,alignItems:'center',justifyContent:'center'  }}>
        <Text style={[{fontSize:item.size,color:'orange',fontWeight:'bold',}]}>
          {item.face}
        </Text>
      </View>

      <View style={{flex:2.5,flexDirection:'row',}}>
       <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text style={{color:'black',fontWeight:'bold',fontSize:20}}>{item.price}$ </Text>
       </View>

        {value ?
         <View style={{flex:2,alignItems:'flex-end',justifyContent:'flex-end'}}>
          <Text style={{fontSize:12,fontWeight:'bold'}}>{date[0]} {date[1]} {date[2]} {date[3]}</Text>
          <Text style={{fontSize:12,fontWeight:'bold',marginRight:5,marginBottom:5}}>{time[0]}:{time[1]}:{time[2]} </Text>
         </View>
          :
         <View style={{flex:2,alignItems:'flex-end',justifyContent:'flex-end'}}>
          <Text style={{fontSize:12,fontWeight:'bold',marginRight:10,marginBottom:10}}>{diffDays} days ago</Text>
         </View>
        }

     </View>

    </View>
  );
}
