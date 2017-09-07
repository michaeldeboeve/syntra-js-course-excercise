window.addEventListener('load', function(){
  var myTodos = [
    {
      "todoId": 1,
      "todoTitle": "Just a title",
      "todoDescription": "",
      "todoCompleted": false
    }, {
      "todoId": 2,
      "todoTitle": "This is a todo",
      "todoDescription": "- with<br />- multiple<br />- lines<br />- description<br />- it goes<br />- on<br />- and<br />- on<br />- and <br />- on<br />- …",
      "todoCompleted": false
    }, {
      "todoId": 3,
      "todoTitle": "Another todo",
      "todoDescription": "this to do is marked as done",
      "todoCompleted": true
    }, {
      "todoId": 4,
      "todoTitle": "YAT",
      "todoDescription": "Supercalifragelisticexpialidocious!",
      "todoCompleted": false
    }, {
      "todoId": 5,
      "todoTitle": "Multiline todo is done",
      "todoDescription": "oh<br />my<br />goodness!!",
      "todoCompleted": true
    }
  ];


  todo.init({
    "mainTitle": "My Todo's",
    "localStorageName": "myTodos",
    "targetList": "todo-list",
    "addButtonId": "btn--add",
    "todoTemplate": "templateTodoItem",
    "emptyTemplate": "templateTodoEmpty",
    "defaultTodos": myTodos
  });

});

var todo = (function(){
  var todos = [];
  var todoTemplate;
  var emptyTemplate;
  var templateHtml;
  var templateHtmlEmpty;
  var btnAdd;
  var targetList;
  var todoId = 0;


  return {
    init: function(settings){
      todoTemplate  = s.id(settings.todoTemplate);
      emptyTemplate = s.id(settings.emptyTemplate);
      btnAdd        = s.id(settings.addButtonId);
      targetList    = s.id(settings.targetList);
      storageName   = settings.localStorageName;
      mainTitle     = settings.mainTitle;

      templateHtml = todoTemplate.innerHTML;
      templateHtmlEmpty = emptyTemplate.innerHTML;

      // Set the title
      s.id('maintitle').innerHTML = mainTitle;

      // Set Focus
      s.id('name').focus();

      if(localStorage[storageName]){
        todos = storage.get(storageName, 'JSON');
        for(var i = 0; i<todos.length; i++) {
          this.addToDOM(todos[i]);
        }

        if(todos.length === 0){
          todoId = 0;
          todo.showWhenEmpty(true);
        } else {
          todoId = todos[i-1].todoId;
        }

      } else if(settings.defaultTodos) {
        todos = settings.defaultTodos;

        for(var i = 0; i<todos.length; i++) {
          this.addToDOM(todos[i]);
        }
        todoId = todos[i-1].todoId;

      } else {
        this.showWhenEmpty(true);
      }


      // Add Button
      btnAdd.addEventListener('click', function(e){
        var name = s.id('name');
        var description = s.id('description');

        if(!todo.add(name.value, description.value)){
          name.setAttribute('class', 'error');
          s.id('name').focus();
        } else {
          todo.showWhenEmpty(false);
          name.removeAttribute('class');
          name.value = '';
          description.value = '';
          s.id('name').focus();
        }
        e.preventDefault();
      });

      // Done/Delete buttons
      targetList.addEventListener('click', function(e){
        // console.log(e.target.nodeName);

        switch (e.target.nodeName) {
          case 'INPUT':
            var todoId = e.path[2].dataset.id;
            // console.log('is input');
            todo.check(todoId, e.target.checked);
            break;

          case 'path':
            var todoId = e.path[5].dataset.id;
            // console.log(todoId);
            todo.remove(todoId);
            break;
          case 'A':
            var todoId = e.path[2].dataset.id;
            // console.log(todoId);
            todo.remove(todoId);
            e.preventDefault();
            break
        }

      })
    },
    showWhenEmpty: function(status){
      switch (status) {
        case true:
          if(todos.length == 0) {
            targetList.insertAdjacentHTML('beforeend', emptyTemplate.innerHTML);
            storage.delete(storageName);
          }
          break;
        case false:
          if(todos.length == 1) {
            s.id('is-empty').remove();
          }
          break;
      }
    },
    add: function(name, description){
      // console.log(name,description);

      if(name == ''){
        return false;
      } else {
        todoId++;
        var item = {
          "todoId": todoId,
          "todoTitle": name,
          "todoDescription": description.replace(/\n\r?/g, '<br />'),
          "todoCompleted": false
        }

        // Push to array
        todos.push(item);

        // Add to DOM and update local storage
        this.addToDOM(item);
        storage.set(storageName, todos, 'JSON');

        return true
      }
    },
    remove: function(nr){
      var items = targetList.children;
      for(var i=0;i<items.length; i++) {
        if(items[i].dataset.id == nr){
          targetList.removeChild(items[i]);

          for(var i=0; i<todos.length;i++) {
            if(todos[i].todoId == nr) {
              todos.splice(i,1);
            }
          }

          storage.set(storageName, todos, 'JSON');
          // console.log(items[i]);
          todo.showWhenEmpty(true);
          return;
        }
      }
    },
    check: function(nr, isChecked){
      var items = targetList.children;

      for(var i=0;i<items.length; i++) {
        if(items[i].dataset.id == nr){
          items[i].dataset.completed = isChecked;

          for(var i=0; i<todos.length;i++) {
            if(todos[i].todoId == nr) {
              todos[i].todoCompleted = isChecked;
            }
          }


          storage.set(storageName, todos, 'JSON');
          return;
        }
      }
    },
    addToDOM: function(item){
      // Get template
      // Template replace with item data
      // Append to DOM
      var todoItemHtml = templateHtml.replace(/{{todoId}}/g, item.todoId)
                                     .replace(/{{todoTitle}}/g, item.todoTitle)
                                     .replace(/{{todoDescription}}/g, item.todoDescription)
                                     .replace(/{{todoCompleted}}/g, item.todoCompleted);

      if(!item.todoCompleted){
        todoItemHtml = todoItemHtml.replace(/{{checked}}/g, '');
      } else {
        todoItemHtml = todoItemHtml.replace(/{{checked}}/g, ' checked');
      }

      targetList.insertAdjacentHTML('beforeend', todoItemHtml);

    }
  }
})();

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
