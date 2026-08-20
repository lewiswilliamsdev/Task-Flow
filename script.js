const taskForm = document.getElementById("add-new-task")
const taskView = document.getElementById("task-view")
const yourTasks = document.getElementById("your-tasks")
const tasksNotStarted = document.getElementById("not-started-cards")
const tasksInProgress = document.getElementById("in-progress-cards")
const tasksCompleted = document.getElementById("completed-cards")
const titleInput = document.getElementById("title-input")
const statusInput = document.getElementById("status-input")
const priorityInput = document.getElementById("priority-input")
const dateInput = document.getElementById("date-input")
const submitButton = document.getElementById("submit-button")
const submitButtonText = document.querySelector("#submit-button span")
const taskCounterMobile = document.getElementById("task-counter-mobile")
const tasksNotStartedSummary = document.getElementById("tasks-not-started-summary")
const tasksInProgressSummary = document.getElementById("tasks-in-progress-summary")
const tasksCompletedSummary = document.getElementById("tasks-completed-summary")
const selectedFilter = document.getElementById("task-view")
const notStartedContainer = document.getElementById("tasks-not-started")
const inProgressContainer = document.getElementById("tasks-in-progress")
const completedContainer = document.getElementById("tasks-completed")
const mobileTaskHeading = document.getElementById("mobile-task-heading")

let tasks = [];

const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
    tasks = JSON.parse(savedTasks);
}

let editingTaskId = null;

function sortTasksByPriority() {
    const priorityRank = {
        high: 3,
        medium: 2,
        low: 1
    };

    const sortedTasks = [...tasks];

    sortedTasks.sort(function(taskA, taskB) {
        return priorityRank[taskB.priority] - priorityRank[taskA.priority];
    });

    return sortedTasks;
}

function renderTasks(list) {
    tasksNotStarted.innerHTML = "";
    tasksInProgress.innerHTML = "";
    tasksCompleted.innerHTML = "";

    list.forEach(function(task) {
        renderTask(task);
    });
}
function updateTaskCounter() {
    const notStartedNumber = tasks.filter(function (task) {
        return task.status === "notStarted"
    })

    tasksNotStartedSummary.textContent = notStartedNumber.length;

    const inProgressNumber = tasks.filter(function (task) {
        return task.status === "inProgress"
    })

    tasksInProgressSummary.textContent = inProgressNumber.length;

    const completedNumber = tasks.filter(function (task) {
        return task.status === "completed"
    })

    tasksCompletedSummary.textContent = completedNumber.length;
}

function filterTasks() {
    const selectedStatus = selectedFilter.value;

    notStartedContainer.classList.remove("active");
    inProgressContainer.classList.remove("active");
    completedContainer.classList.remove("active")

    if (selectedStatus === "all") {
        notStartedContainer.classList.add("active");
        inProgressContainer.classList.add("active");
        completedContainer.classList.add("active");
    } else if (selectedStatus === "notStarted") {
        notStartedContainer.classList.add("active");
    } else if (selectedStatus === "inProgress") {
        inProgressContainer.classList.add("active");
    } else if (selectedStatus === "completed") {
        completedContainer.classList.add("active");
    }

    const sortedTasks = sortTasksByPriority();

    renderTasks(sortedTasks);
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

selectedFilter.addEventListener("change", function() {
    const selectedOptionText = 
    selectedFilter.selectedOptions[0].textContent;

    mobileTaskHeading.textContent = selectedOptionText;

    filterTasks();
})

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

    saveTasks();
    filterTasks(); 
    updateTaskCounter();
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

    const deleteButton = document.createElement("button");
    deleteButton.className = ("delete-button");

    const deleteButtonIcon = document.createElement("i");
    deleteButtonIcon.className = ("fa-solid fa-trash");

    taskCard.appendChild(taskTitle);

    taskInformationContainer.appendChild(taskPriority);

    taskDate.appendChild(taskDateIcon);

    taskDateContainer.appendChild(taskDate);

    taskAdditionalInformation.appendChild(taskDateContainer);

    editButton.appendChild(editButtonIcon);

    taskAdditionalInformation.appendChild(editButton);

    deleteButton.appendChild(deleteButtonIcon);

    taskAdditionalInformation.appendChild(deleteButton);

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

    const taskCard = clickedEditButton.closest(".task-card");
    const taskId = Number(taskCard.dataset.id);

    const taskToEdit = tasks.find(function (task) {
        return task.id === taskId;
    })

    if (!taskToEdit) {
        return;
    }

    titleInput.value = taskToEdit.title;
    statusInput.value = taskToEdit.status;
    priorityInput.value = taskToEdit.priority;
    dateInput.value = taskToEdit.date;

    editingTaskId = taskId;

    submitButtonText.textContent = "Update Application";

    submitButton.classList.add("edit-state");

    filterTasks() 
    updateTaskCounter();
}) 

yourTasks.addEventListener("click", function (event) {
    const taskToDelete = event.target.closest(".delete-button");

    if (!taskToDelete) {
        return;
    };

    const taskCard = taskToDelete.closest(".task-card");
    const taskId = Number(taskCard.dataset.id);

    tasks = tasks.filter(function (task) {
        return task.id !== taskId;
    });

    saveTasks();
    filterTasks() ;
    updateTaskCounter();
})

filterTasks();
updateTaskCounter();

// filter tasks by priority from highest to lowest //


