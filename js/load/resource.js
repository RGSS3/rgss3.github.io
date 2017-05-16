var R = module.exports = {};
R.$H          = [];
R.addHandle   = function(sig, fn){
  R.$H.push([sig, fn]);
};

R.get         = function(name){
 try{
  R.$H.forEach(function(value){
      var sig = value[0], fn = value[1];
      if(match = name.match(sig)){
          throw fn(match);
      }
  });
 }catch(e){
   return e;
 }
 throw "can't find " + name;
};


R.addHandle(/^\+(.*)$/, function(match){
   url = match[1];
   if(url.indexOf("/") == -1){
     return function(next){
         RE.$L.script("https://unpkg.com/" + url, next);
     };
   }
});



