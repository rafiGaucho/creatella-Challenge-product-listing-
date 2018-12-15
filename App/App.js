import React, {PropTypes} from 'react';
import {
  View,Text,ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import Home from './Home';
import {randomVariableArray} from './randomVariableArray'
import { saveRandomVariable,saveDates,fetchData } from './store/actions';

class App  extends React.Component {
componentDidMount(){
  randomVariable=randomVariableArray(); //create array of randomVariable
  this.props.saveRandomVariable(randomVariable); // save it to store
  dateToday=new Date(); //todays date
  dateB4Week=new Date(new Date().setDate(new Date().getDate() - 7)); //date b4 a week
  this.props.saveDates(dateToday,dateB4Week); // save it to store
  this.props.fetchData(this.props.page,this.props.sortSelect,this.props.hasMore) //fetch products

}

componentDidUpdate (prevProps,prevState){
  //triggers when sort selection variable is changed
  if(prevProps.sortSelect != this.props.sortSelect){
    randomVariable=randomVariableArray();
    this.props.saveRandomVariable(randomVariable);
    dateToday=new Date();
    dateB4Week=new Date(new Date().setDate(new Date().getDate() - 7));
    this.props.saveDates(dateToday,dateB4Week);
    this.props.fetchData(this.props.page,this.props.sortSelect,this.props.hasMore)

  }
}
  render() {
    if (this.props.loading) {
      return (
        <View style={{backgroundColor:'white',alignItems:'center',justifyContent:'center',height:'100%',width:'100%'}}>
          <ActivityIndicator size='large'/>
        </View>
      );
    }
    else if (this.props.error) {
      return (
        <View style={{height:'100%',width:'100%',alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>Can't Load Products</Text>
        </View>
      );
    }
    else {
      return (<Home />);
    }

  }
}
mapDispatchToProps={
saveRandomVariable:saveRandomVariable,
saveDates:saveDates,
fetchData:fetchData
}
mapStateToProps=(state)=>({
  loading:state.loading,
  page:state.page,
  error:state.error,
  sortSelect:state.sortSelect,
  hasMore:state.hasMore
})
export default connect(mapStateToProps,mapDispatchToProps)(App)
