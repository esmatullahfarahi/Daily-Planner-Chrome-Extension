// Get DOM elements
const taskInput=document.getElementById("taskInput");
const addTaskButton=document.getElementById("addTaskButton");
const taskList=document.getElementById("taskList");

// Initialize taskArray with tasks from local storage
let taskArray=getTasksFromLocalStorage();

// Function to fetch tasks from local storage
function getTasksFromLocalStorage() {

    const tasksString = localStorage.getItem("tasks");
    const tasksArray = JSON.parse(tasksString) || [];
    return tasksArray;
 
}

// Function to update tasks in local storage
function updateTasksInLocalStorage() {

  const tasksString = JSON.stringify(taskArray);
  localStorage.setItem("tasks", tasksString);

}

// Function to create a new task object
function createTask(taskText) {
  return {
    text: taskText,
    completed: false
  };
}

// Function to delete a task
function deleteTask(index) {

  taskArray.splice(index,1);
  updateTasksInLocalStorage();

}


// 3.5 Implement the createTaskElement(taskObj) Function
function createTaskElement(taskObj) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("taskItem");
  
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = taskObj.completed;
    checkbox.addEventListener("change", function () {
        taskObj.completed = checkbox.checked;
        taskTextElement.classList.toggle("completed", taskObj.completed);
        updateTasksInLocalStorage();
    });
  
    const taskTextElement = document.createElement("span");
    taskTextElement.classList.add("taskText");
    taskTextElement.textContent = taskObj.text;
    taskTextElement.classList.toggle("completed", taskObj.completed);
  
    const removeButton = document.createElement("button");
    removeButton.classList.add("removeButton");
    removeButton.textContent = "X";
    removeButton.addEventListener("click", function () {
        deleteTask(taskObj);
        renderTasks();
    });
  
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(removeButton);
  
    return taskItem;
}

// Function to render tasks on the page
function renderTasks() {
  const taskList = document.getElementById("taskList"); 
  taskList.innerHTML = "";

  for (let i = 0; i < taskArray.length; i++) {
    const taskElement = createTaskElement(taskArray[i]);
    taskList.appendChild(taskElement);
  }

}

// Event listener for adding a new task
addTaskButton.addEventListener("click", function () {

  const taskText = taskInput.value;
  if (taskText === "") return;

  const newTask = createTask(taskText);
  taskArray.push(newTask);
  updateTasksInLocalStorage();

  taskInput.value= "";
  renderTasks();

});

// Initial rendering of tasks on page load
renderTasks();