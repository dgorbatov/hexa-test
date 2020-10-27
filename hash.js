//PASSWORD: hello123
//DISPLAY: hi123,cos(30) = sqrt(3)/2 (first 3 decimel places)

function hashString(stringHash){
    var retVal = 0;

    for(i=0; i < stringHash.length; ++i){
      retVal += stringHash.indexOf(i) * stringHash.indexOf(i);
    }

    return Math.sqrt(retVal);
}

function hashStringNum(stringHash, num){
  var retVal = 0;

  if(num == "all"){
    num = 2;
  }
  
  for(i=0; i < stringHash.length; ++i){
    retVal += (stringHash.indexOf(i) * stringHash.indexOf(i)) / num;
  }

  return Math.sqrt(retVal);
}

function hashSecure(stringHash,key){
  var retVal = 0;

  for(i=0; i < stringHash.length; ++i){
    retVal += (stringHash.indexOf(i) * stringHash.indexOf(i));
  }

  retVal += retVal * key + stringHash.indexOf(0);

  return Math.sqrt(retVal);
}

//console.log(hashSecure("hi123",0.866));