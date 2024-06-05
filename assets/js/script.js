// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) ?? [];
let nextId = JSON.parse(localStorage.getItem("nextId")) ?? 0;

// TODO: create a function to generate a unique task id
function generateTaskId() {
  // if nextId does not exist in localStorage, set it to 1

  // otherwise, increment it by 1

  // save nextId to localStorage
  localStorage.setItem('nextId', ++nextId);
}

// create a function to create a task card
function createTaskCard(task) {
  // set card background color based on due date
  let backgroundClass;
  const dueDate = dayjs(task.dueDate);
  const today = dayjs();
  if(today.isAfter(dueDate, 'day')){
    backgroundClass = "bg-danger";
  }else if(today.isSame(dueDate, 'day')){
    backgroundClass = "bg-warning";
  }
  // create and append card elements
  $("#todo-cards").append(`
      <div class="card mb-3 ${backgroundClass}">
        <div class="card-header ">${task.title}</div>
          <div class="card-body">
            <p class="card-description mb-2 text-body-secondary">${task.description}</p>
            <p class="card-date">${task.dueDate}</p>
            <button type="button" class="btn btn-danger">Delete</button>
        </div>
      </div>
  `);
}

// TODO: create a function to render the task list and make cards draggable
function renderTaskList() {
  // if taskList is null, set it to an empty array

  // empty existing task cards

  // loop through tasks and create task cards for each status

  // make task cards draggable
 
}

// create a function to handle adding a new task
function handleAddTask(event) {
  const title = $("#task-title").val()?.trim();
  const dueDate = $("#task-due-date").val()?.trim();
  const description = $("#task-description").val()?.trim();

  if (!title || !dueDate || !description) {
    alert("You need to fill out all the details!");
    return;
  }

  generateTaskId();

  // create a new task object
  const task = {
    id: nextId,
    title: title,
    dueDate: dueDate,
    description: description,
    status: 'to-do'
  };
  // add the new task to the taskList save and render
  taskList.push(task);
  localStorage.setItem("tasks", JSON.stringify(taskList));

  createTaskCard(task);

  // resets form
  $("#task-title").val("");
  $("#task-due-date").val("");
  $("#task-description").val("");
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

// when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  // render the task list

  // add event listener
  $("#add-task-button").on('click', handleAddTask);

  // make lanes droppable


  // make due date field a date picker
  $("#task-due-date").datepicker();
});
