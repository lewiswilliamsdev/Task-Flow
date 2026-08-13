const taskForm = document.getElementById("add-new-task")
const taskView = document.getElementById("task-view")
const yourTasks = document.getElementById("your-tasks")
const tasksNotStarted = document.getElementById("tasks-not-started")
const tasksInProgress = document.getElementById("tasks-in-progress")
const tasksCompleted = document.getElementById("tasks-completed")
const titleInput = document.getElementById("title-input")
const statusInput = document.getElementById("status-input")
const priorityInput = document.getElementById("priority-input")
const dateInput = document.getElementById("date-input")

let tasks = []

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const titleValue = titleInput.value;
    const statusValue = statusInput.value;
    const priorityValue = priorityInput.value;
    const dateValue = dateInput.value;

    const taskData = {
        title: titleValue,
        status: statusValue,
        priority: priorityValue,
        date: dateValue
    }

    const task = {
        id: Date.now(),
        ...taskData
    }

    tasks.push(task);
    console.log(task);

    renderTask(task);
    taskForm.reset();
});

function renderTask(task) {
    const taskCard = document.createElement("div");
    taskCard.className = "task-card";
    taskCard.dataset.id = task.id

    const taskTitle = document.createElement("h3");
    taskTitle.textContent = task.title;

    const taskInformationContainer = document.createElement("div");
    taskInformationContainer.className = ("task-information-container");

    const taskPriority = document.createElement("p");
    taskPriority.className = (`task-priority ${task.priority}`);
    taskPriority.textContent = task.priority;

    const taskDateContainer = document.createElement("div");
    taskDateContainer.className = ("task-date-container");

    const taskDate = document.createElement("p");
    taskDate.className = ("task-date");
    taskDate.textContent = task.date;

    const taskDateIcon = document.createElement("i");
    taskDateIcon.className = ("fa-regular fa-calendar");

    taskCard.appendChild(taskTitle);

    taskInformationContainer.appendChild(taskPriority);

    taskDate.appendChild(taskDateIcon);

    taskDateContainer.appendChild(taskDate);

    taskInformationContainer.appendChild(taskDateContainer);

    taskCard.appendChild(taskInformationContainer);

    if (task.status === "notStarted") {
        tasksNotStarted.appendChild(taskCard);
    }

    if (task.status === "inProgress") {
        tasksInProgress.appendChild(taskCard);
    }

    if (task.status === "completed") {
        tasksCompleted.appendChild(taskCard)
    }
}