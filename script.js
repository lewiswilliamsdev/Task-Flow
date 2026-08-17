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
const submitButton = document.getElementById("submit-button")
const submitButtonText = document.querySelector("#submit-button span")

let tasks = []

let editingTaskId = null

function renderTasks() {
    tasksNotStarted.innerHTML = "";
    tasksInProgress.innerHTML = "";
    tasksCompleted.innerHTML = "";

    tasks.forEach(function (task) {
        renderTask(task);
    })
}

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

    if (editingTaskId === null) {
        const task = {
        id: Date.now(),
        ...taskData
    };

        tasks.push(task);
    } else {
        const taskToUpdate = tasks.find(function (task) {
            return task.id === editingTaskId
        });

        if (taskToUpdate) {
            Object.assign(taskToUpdate, taskData)
        }

        editingTaskId = null;
        submitButtonText.textContent = "Add Application"
        submitButton.classList.remove("edit-state")
    }

    renderTasks();
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

    const taskAdditionalInformation = document.createElement("div");
    taskAdditionalInformation.className = ("task-additional-information");

    const taskDateContainer = document.createElement("div");
    taskDateContainer.className = ("task-date-container");

    const taskDate = document.createElement("p");
    taskDate.className = ("task-date");
    taskDate.textContent = task.date;

    const taskDateIcon = document.createElement("i");
    taskDateIcon.className = ("fa-regular fa-calendar");

    const editButton = document.createElement("button");
    editButton.className = ("edit-button");

    const editButtonIcon = document.createElement("i");
    editButtonIcon.className = ("fa-solid fa-pencil");

    taskCard.appendChild(taskTitle);

    taskInformationContainer.appendChild(taskPriority);

    taskDate.appendChild(taskDateIcon);

    taskDateContainer.appendChild(taskDate);

    taskAdditionalInformation.appendChild(taskDateContainer);

    editButton.appendChild(editButtonIcon);

    taskAdditionalInformation.appendChild(editButton);

    taskInformationContainer.appendChild(taskAdditionalInformation);

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

yourTasks.addEventListener("click", function (event) {
    const clickedEditButton = event.target.closest(".edit-button");

    if (!clickedEditButton) {
        return;
    }

    const taskCard = clickedEditButton.closest(".edit-button");
    const taskId = Number(task.dateset.id);

    const taskToEdit = tasks.find(function, (task) {
        return task.id === taskId
    })

    if (!taskToEdit) {
        return;
    }

    titleInput.value = taskToEdit.title;
    statusInput.value = taskToEdit.status;
    priorityInput.value = taskToEdit.priority;
    dateInput.value = taskToEdit.date;

    editingTaskId = taskId;

    submitButtonText.textContent = "Update Application"

    submitButton.classList.add("edit-state")
}) 
