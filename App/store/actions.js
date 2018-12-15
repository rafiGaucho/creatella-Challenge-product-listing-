import {baseURL} from './../Api.js'

export const fetchData=(page,sortSelect,hasMore)=>{
  return (dispatch)=>{
      //fetch only if there are more products to be fetched
    if(hasMore === true){
      fetch(baseURL+page+"&_limit=20&_sort="+sortSelect, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => {
            return response.json();
          }).then((value)=>{
              //store products to state newData in store
            dispatch({type:'fetchData',payload:value})
          }).catch(err=>{
              //when error occurs
            dispatch({type:'error'})
          })
      }
    };
}

export const saveRandomVariable=(randomVariable)=>{
  return (dispatch)=>{
    dispatch({type:'saveRandomVariable',payload:randomVariable})
  };
}

export const saveDates=(dateToday,dateB4Week)=>{
  return (dispatch)=>{
    dispatch({type:'saveDates',payload1:dateToday,payload2:dateB4Week})
  };
}

export const disableOnScroll=()=>{
  return (dispatch)=>{
    dispatch({type:'disableOnScroll'})
  }
}

export const sortChange=(value)=>{
  return (dispatch)=>{
      //firstly , all the states are cleared and loading is enabled
    dispatch({type:'loading'})
      //then ,new data are fetched based on the sort selection
    dispatch({type:'sortChange',payload:value})
  }
}

export const endReached=()=>{
  return (dispatch)=>{
    dispatch({type:'endReached'})
  }
}
