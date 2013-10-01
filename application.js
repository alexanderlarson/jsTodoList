$(document).ready(function() {
  // what is todoTemplate?
  var todoHtmlTemplate = $.trim($('#todo_template').html());
//this gets us the "box" --.html() selects the INNER HTML FOR SOME REASON
  function bindEvents() {
    // Bind functions which add, remove, and complete todos to the appropriate
    $('.todo').keypress(function(e) 
      {
        if (e.which == 13) 
        {
          onTodoButtonClick();
          $('.todo').val(''); //this clears the text box AFTER the submission
        }

      });

    // step 1: grab the "Add Todo" button via jquery.
    var addButton = $('.add');
    addButton.click(onTodoButtonClick);

    var todoList = $('.todo_list');

    // step 2: bind to complete
    todoList.on("click", ".complete", onTodoItemComplete);

    // step 3: bind to delete
    todoList.on("click", ".delete", onTodoItemDelete);
  };

  function onTodoItemComplete (event) {
    var todoItem = $(event.toElement).closest('.todo');
    todoItem.addClass('complete');
  };
  function onTodoItemDelete(event) {
    var todoItem = $(event.toElement).closest('.todo');
    todoItem.fadeOut(500, function() { $().remove(this); });
  };

  //Create functions to add, remove and complete todos

  function onTodoButtonClick () {
      var todoText = grabTodoTextFromBox();
      var isEmptyText = todoText == '' || todoText === null
      if (isEmptyText)
      {
        return;
      }

      addItemToTodoList(todoText); 
  };

  function grabTodoTextFromBox() {
      var todoTextBox = $('.todo');
      var todoText = todoTextBox.val().trim();

      return todoText;
  }

  function addItemToTodoList(todoString) {
      // this is our completed template
      var completedTemplate = buildTodo(todoString);

      // stuff it into the "#todo_list" div
      var entireTodoList = $('.todo_list');
      entireTodoList.append(completedTemplate);
  };

  // CALL THIS FUNCTION AND DON'T ROLL YOUR OWN (YET)
  function buildTodo(todoName) {
    // Creates an jQueryDOMElement from the todoHtmlTemplate.
    var $todo = $(todoHtmlTemplate);


    // Modifies it's text to use the passed in todoName.
    $todo.find('h2').text(todoName);

    // Returns the jQueryDOMElement to be used elsewhere.
    return $todo;
  }
  

  bindEvents();
});
