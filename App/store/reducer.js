export * from './actions'

const initialState={
page:1, //page no. (each page returns 20 products)
isFetch:true, //determines whether to fetch new products to user
newData:[], //arrayofProducts
hasMore:true, //is true if more products are to be fetched
loading:true,
randomVariable:[],
dateToday:'',
dateB4Week:'',
sortSelect:'id' //sort selection variable
}


const session=(state=initialState,action)=>{
 switch (action.type) {
   case 'fetchData':return {...state, newData:action.payload,page:state.page+1,isFetch:true,loading:false}
   break;
   case 'saveRandomVariable':return {...state,randomVariable:action.payload}
   break;
   case 'saveDates':return {...state,dateToday:action.payload1,dateB4Week:action.payload2}
   break;
   case 'blockFetch':return {...state, isFetch:false}
   break;
   case 'error':return {...state, error:true,loading:false}
   break;
   case "disableOnScroll":return {...state ,isFetch:false}
   break;
   case 'endReached':return {...state ,hasMore:false}
   break;
   case 'sortChange':return {...state,sortSelect:action.payload}
   break;
   case 'loading':return {...state ,page:1,isFetch:true,newData:[],hasMore:true,loading:true,randomVariable:[],dateToday:'',dateB4Week:'', sortSelect:''}
   break;
   default: return state;

 }
}

export default session
