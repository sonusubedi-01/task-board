// Retrieve nextId from localStorage
let nextId = JSON.parse(localStorage.getItem("nextId")) ?? 0;

//create a function to generate a unique task id
function generateTaskId() {
  // if nextId does not exist in localStorage, set it to 1

  // otherwise, increment it by 1

  // save nextId to localStorage
  localStorage.setItem('nextId', ++nextId);
}

// returns tasks from local storage
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) ?? [];
}

// returns CSS classes to add based on task status
function getTaskCardStyles(task){
  const dueDate = dayjs(task.dueDate);
  const today = dayjs();
  if("done" !== task.status){
    if(today.isAfter(dueDate, 'day')){
      return "bg-danger text-white";
    }else if(today.isSame(dueDate, 'day')){
      return "bg-warning text-white";
    }
  }
  return 'bg-light text-black';
}


// create a function to create a task card
function createTaskCard(task) {
  // set card background color based on due date
  // create and append card elements
  $(`#${task.status}-cards`).append(`
      <div id="task-${task.id}" class="task-card card mb-3 ${getTaskCardStyles(task)}" data-id="${task.id}">
        <div class="card-header ">${task.title}</div>
          <div class="card-body">
            <p class="card-description mb-2 text-body-secondary">${task.description}</p>
            <p class="card-date">${task.dueDate}</p>
            <button id="delete-task-button" type="button" class="btn btn-danger" data-id="${task.id}">Delete</button>
        </div>
      </div>
  `);

  makeTasksDraggable();
}

// create a function to render the task list and make cards draggable
function renderTaskList() {
  const tasks = getTasks();
  // loop through tasks and create task cards for each status
  for(let task of tasks){
    createTaskCard(task);
  }

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
    status: 'todo'
  };
  // add the new task to the taskList save and render
  const tasks = JSON.parse(localStorage.getItem("tasks")) ?? []
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  createTaskCard(task);

  // resets form
  $("#task-title").val("");
  $("#task-due-date").val("");
  $("#task-description").val("");
}

// create a function to handle deleting a task
function handleDeleteTask(event) {
  // get the task id from the button clicked
  const id = $(this).attr("data-id");

  // remove the task from the taskList, save and render
  const tasks = getTasks();
  const newTaskList = [];
  for(let task of tasks){
    if(task.id != id){
      newTaskList.push(task);
    }
  }
  localStorage.setItem("tasks", JSON.stringify(newTaskList));
  $(`#task-${id}`).remove();
}



// create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  // get the task id and new status from the event
  const draggable = ui.draggable;
  const taskId = draggable.attr("data-id");
  const lane = $(this).attr('id');

  draggable.css({
    top : 0,
    left: 0,
    position: 'relative'
  });

  $(`#${lane}-cards`).append(draggable);

  // update the task status of the dragged card
  const tasks = getTasks();
  for(let task of tasks){
    if(task.id == taskId){
      task.status = lane
      $(`#task-${taskId}`).removeClass('bg-danger bg-warning bg-light text-white text-black').addClass(getTaskCardStyles(task));
    }
  }

  // save and render
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

//make task draggable
function makeTasksDraggable() {
 $(".task-card").draggable({
  revert: 'invalid',
  zIndex: 100
 });
}

// when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  // render the task list
  renderTaskList();

  // add event listener
  $("#add-task-button").on('click', handleAddTask);

$(".swim-lanes").on('click', '#delete-task-button', handleDeleteTask);

  // make lanes droppable
$(".lane").droppable({
    accept: '.task-card',
    drop: handleDrop
  });

  makeTasksDraggable();

  // make due date field a date picker
  $("#task-due-date").datepicker();
});
