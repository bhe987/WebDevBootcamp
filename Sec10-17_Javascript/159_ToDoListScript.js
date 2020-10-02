// Saturday July 25, 2020
var todos = ["buy new turtle"];
window.setTimeout(function() {

	var input = prompt("What would you like to do?");

	while (input !== "quit") {
		//handle input
		if (input === "list") {
			listTodos();
		}
		else if (input === "new") {
			addTodo();
		}
		else if (input === "delete"){
			deleteTodo();
		}

		//ask for new input
		var input = prompt("What would you like to do?");
	}
	console.log("okay, you've quit the app.");
}, 500);

function listTodos(){
	console.log("*********");
		todos.forEach(function(todo, i){
			console.log(i + ": " + todo);
		});
		console.log("*********");
}
function addTodo(){
	// ask for new todo
	var newTodo = prompt("Enter new task");
	// add to todos array
	todos.push(newTodo);
	console.log("added todo task");
}
function deleteTodo(){
	//ask for index of task to remove
	var indexToDel = prompt("enter the index of task to delete: ");
	//delete the task
	todos.splice(indexToDel, 1);
	console.log("deleted todo task");
}