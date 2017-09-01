var storage = (function(){
  return {
    overwriteAll: function(db, arr){
      localStorage[db] = JSON.stringify(arr);
    },
    get: function(db){
      return JSON.parse(localStorage[db]);
    }
  }
})();
