import React, {PropTypes} from 'react';
import {
  View,Dimensions,Image,TouchableOpacity,Picker,
  StyleSheet,Text,ScrollView,ActivityIndicator
} from 'react-native';
import {connect} from 'react-redux';
import {fetchData,disableOnScroll,endReached,sortChange} from './../store/actions.js';
import {Product} from './Product';
import {DotIndicator} from 'react-native-indicators';
import {adURL} from './../Api';

const widthScreen= Dimensions.get('window').width/18;
const heightScreen= Dimensions.get('window').height/26;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={i:1,data:this.props.newData,}
}

//onscroll listener
isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
     return  layoutMeasurement.height + contentOffset.y >= contentSize.height-50;
    }

getListOfPictures=()=>{
  if(this.props.isFetch){
      this.props.disableOnScroll();
          // creation of urlVariable
          // as there are only 10 ads ,the ads are repeated as 10
       let urlVariable=this.props.randomVariable[this.state.i]
       this.setState({i:this.state.i + 1})
       while (this.state.i > 9) { this.setState({i:0})}

        //pushing the adHolder(which has urlVariable) to the array at position after each 20 products
        //and merging the prefetched data array of  products with old array of products
       let adHolder=[{urlVariable:urlVariable,"id": "687","size": 28,"price": 198,"face": "(ó ì_í)", "date": "Tue Nov 27 2018 14:38:12 GMT+0530 (IST)"}]
       array=this.state.data;
       array=array.concat(adHolder)
       array=array.concat(this.props.newData)
       this.setState({data:array})

        //if the prefetched data array is lessthan 20 ,no more data to be fetched so
        // the end has reached
       if(this.props.newData.length < 20){
        this.props.endReached()
       }

      //fetch next set of data(20 producst) only if the prefetched data is >20
      //which implies there are more products to fetch
     if(this.props.newData.length >= 20){
      this.props.fetchData(this.props.page,this.state.sortSelect,this.props.hasMore)
     }

    }
  }

sortChange=(value)=>{
    this.props.sortChange(value);
}



render() {
  let i=20;
 return (
   <View style={{height:'100%',width:'100%',backgroundColor:'#F8EFBA'}}>
     <ScrollView onScroll={ ({ nativeEvent }) => {
         if (this.isCloseToBottom(nativeEvent)) {
           this.getListOfPictures(); }} }>

        <View style={{width:'100%',backgroundColor:'#2ed573'}}>
          <Text style={{fontSize:25,marginLeft:'3%',fontWeight:'900'}}>Products Grid</Text>
          <Text style={{fontSize:16,marginLeft:'3%',marginRight:'1%',fontWeight:'400'}}>       Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</Text>
          <Text style={{fontSize:16,marginLeft:'3%',marginTop:'3%',fontWeight:'400'}}>But first, a word from our sponsors:</Text>
          <View  style={{height:heightScreen*10,width:'90%',marginHorizontal:'5%',marginVertical:20}}>
            <Image source={{uri: adURL+this.props.randomVariable[0]}} style={{resizeMode: 'stretch',height:'100%',width:'100%'}} />
          </View>
        </View>
        <View style={{flexDirection:'row'}}>
          <View style={{height:heightScreen*2,width:'60%',marginLeft:'5%',justifyContent:'center'}}>
            <Text style={{fontSize:16,fontWeight:'400',color:'black'}}>Sort by</Text>
          </View>
          <Picker  prompt="Sort By"
            selectedValue={this.props.sortSelect}
            style={{ height: heightScreen*2, width:'35%',marginRight:'5%' }}
            onValueChange={this.sortChange}>
            <Picker.Item label="id" value="id" />
            <Picker.Item label="size" value="size" />
            <Picker.Item label="price" value="price" />
          </Picker>
        </View>

        <View style={{flexDirection:'row',flexWrap:'wrap',height:'100%',backgroundColor:'#2ed573'}}>

           {this.state.data.map((item,index)=>{

              if(index===20 ){
                return (
                  <View key={item.id} style={{height:heightScreen*10,width:'90%',marginHorizontal:'5%',marginVertical:20}}>
                    <Image source={{uri: adURL+item.urlVariable}} style={{resizeMode: 'stretch',height:'100%',width:'100%'}} />
                  </View>
                );
              }

              else if (index>21 && index===21+i) {
                i=i+21;
                return (
                  <View key={item.id} style={{height:heightScreen*10,width:'90%',marginHorizontal:'5%',marginVertical:20}}>
                    <Image source={{uri: adURL+item.urlVariable}} style={{resizeMode: 'stretch',height:'100%',width:'100%'}} />
                  </View>
                );
               }

              else {
                return (
                  <Product index={index} item={item}
                 key={item.id} dateToday={this.props.dateToday}
                 date={this.props.dateB4Week} select={this.state.hello}/>
               );
              }

            })}
                <View style={{alignItems:'center',justifyContent:'center',width:'100%'}}>

                {
                  this.props.hasMore ?
                  <View style={{color:'black',fontSize:14,fontWeight:'bold',flexDirection:'row',justifyContent:'space-around'}}>
                    <Text style={{fontSize:14,fontWeight:'bold',marginLeft:"35%"}}>Loading</Text>
                    <DotIndicator size={8} style={{marginRight:'30%'}}/>
                  </View>
                    :
                    <Text style={{textAlign:'center',color:'black',fontSize:16,fontWeight:'bold'}}>~ end of catalogue ~</Text>
                }
              </View>
         </View>
     </ScrollView>
   </View>
     );
  }
}




mapDispatchToProps={
  fetchData:fetchData,disableOnScroll:disableOnScroll,
  endReached:endReached,sortChange:sortChange
}
mapStateToProps=(state)=>({
isFetch:state.isFetch,dateToday:state.dateToday,dateB4Week:state.dateB4Week,
newData:state.newData,hasMore:state.hasMore,randomVariable:state.randomVariable,
sortSelect:state.sortSelect,page:state.page


})
export default connect(mapStateToProps,mapDispatchToProps)(Home)
