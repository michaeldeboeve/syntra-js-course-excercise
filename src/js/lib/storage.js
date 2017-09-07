var storage = (function(){
  return {
    set: function(keyName, keyValue, dataType = null){
      if(dataType === 'JSON' || dataType === 'json'){
        localStorage.setItem(keyName, JSON.stringify(keyValue));
      } else {
        localStorage.setItem(keyName, keyValue);
      }
    },
    get: function(keyName, dataType = false){
      if(dataType === 'JSON' || dataType === 'json'){
        return JSON.parse(localStorage.getItem(keyName));
      } else {
        return localStorage.getItem(keyName);
      }
    },
    delete: function(keyName){
      localStorage.removeItem(keyName);
    }
  }
})();
