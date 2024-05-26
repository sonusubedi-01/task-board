// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// TODO: create a function to generate a unique task id
function generateTaskId() {
  // if nextId does not exist in localStorage, set it to 1

  // otherwise, increment it by 1

  // save nextId to localStorage
}

// TODO: create a function to create a task card
function createTaskCard(task) {
  // create card elements

  // set card background color based on due date

  // append card elements
}

// TODO: create a function to render the task list and make cards draggable
function renderTaskList() {
  // if taskList is null, set it to an empty array

  // empty existing task cards

  // loop through tasks and create task cards for each status

  // make task cards draggable
}

// TODO: create a function to handle adding a new task
function handleAddTask(event) {
  // create a new task object

  // add the new task to the taskList save and render
}

// TODO: create a function to handle deleting a task
function handleDeleteTask(event) {
  // get the task id from the button clicked

  // remove the task from the taskList, save and render
}

// TODO: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  // get the task id and new status from the event

  // update the task status of the dragged card

  // save and render
}

// TODO: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  // render the task list

  // add event listener

  // make lanes droppable

  // make due date field a date picker
});
