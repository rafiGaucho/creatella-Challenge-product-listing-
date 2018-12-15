export function randomVariableArray (){
  var max = 10;
  var random = [];
  for(var i = 0;i<max ; i++){
    var temp = Math.floor(Math.random()*max)+1;
    if(random.indexOf(temp) == -1){
        random.push(temp);
  }
    else
     i--;
   }
  return random;
}
