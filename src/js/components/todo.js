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
      todoTemplate  = document.getElementById(settings.todoTemplate);
      emptyTemplate = document.getElementById(settings.emptyTemplate);
      btnAdd        = document.getElementById(settings.addButtonId);
      targetList    = document.getElementById(settings.targetList);
      storageName   = settings.localStorageName;
      mainTitle     = settings.mainTitle;

      templateHtml = todoTemplate.innerHTML;
      templateHtmlEmpty = emptyTemplate.innerHTML;

      // Set the title
      document.getElementById('maintitle').innerHTML = mainTitle;

      // Set Focus
      this.setFocus('name');

      if(localStorage[storageName]){
        todos = storage.get(storageName);
        for(var i = 0; i<todos.length; i++) {
          this.addToDOM(todos[i]);
        }

        if(todos.length === 0){
          todoId = 0;
          todo.showIsEmpty(true);
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
        this.showIsEmpty(true);
      }


      // Add Button
      btnAdd.addEventListener('click', function(e){
        var name = document.getElementById('name');
        var description = document.getElementById('description');

        if(!todo.add(name.value, description.value)){
          name.setAttribute('class', 'error');
          todo.setFocus('name');
        } else {
          todo.showIsEmpty(false);
          name.removeAttribute('class');
          name.value = '';
          description.value = '';
          todo.setFocus('name');
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
    setFocus: function(id){
      document.getElementById(id).focus();
    },
    showIsEmpty: function(status){
      switch (status) {
        case true:
          if(todos.length == 0) {
            targetList.insertAdjacentHTML('beforeend', emptyTemplate.innerHTML);
          }
          break;
        case false:
          if(todos.length == 1) {
            document.getElementById('is-empty').remove();
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
        storage.overwriteAll(storageName, todos);

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

          storage.overwriteAll(storageName, todos);
          // console.log(items[i]);
          todo.showIsEmpty(true);
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


          storage.overwriteAll(storageName, todos);
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
