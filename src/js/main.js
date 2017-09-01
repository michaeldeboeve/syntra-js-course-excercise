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
    "localStorageName": "todos",
    "targetList": "todo-list",
    "addButtonId": "btn--add",
    "todoTemplate": "templateTodoItem",
    "emptyTemplate": "templateTodoEmpty",
    "defaultTodos": myTodos
  });

});
