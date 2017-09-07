var s = (function(){
  return {
    id: function(id){
      return document.getElementById(id);
    },
    class: function(className){
      return document.getElementsByClassName(className);
    },
    tag: function(tagName){
      return document.getElementsByTagName(tagName);
    }
  }
})();
