let tasks = [];

function fillNewTask() {
  document.getElementById("tasks").innerHTML = "";
  for (task of tasks) {
    let content = `
                    <div class ="task ${task.isDone ? "done" : " "}">
                               <div class"title-box" dir="ltr">
                                    <div class = "text-box">
                                            <h2>${task.title}
                                            </h2>
                                            <span class="material-symbols-outlined">
                                            loyalty
                                            </span>
                                   </div>
                                    <div class="date-box">
                                            <span> ${task.date}</span>
                                            <span class="material-symbols-outlined">
                                            calendar_month
                                            </span>
                                   </div>
                            </div>
                                    <div class="icon-box">
                                        <button  class="btn-delete  circular" style="background-color: #e71c11; color: #fff;">
                                            <span   class="material-symbols-outlined">
                                                delete
                                            </span>
                                        </button>
                                        ${
                                          task.isDone
                                            ? ` <button class="btn-done circular" style="background-color: #e71c11; color:#fff ;">
                                                      <span class="material-symbols-outlined">
                                                      published_with_changes
                                                      </span>
                                               </button>
                                              `
                                            : ` <button class="btn-done circular" style="background-color: #008000; color:#fff ;">
                                                    <span  class="material-symbols-outlined">
                                                      check_circle
                                                     </span>
                                              </button> `
                                        }
                                        <button class="btn-edit circular" style="background-color: #084294; color: #fff;">
                                            <span class="material-symbols-outlined">
                                                edit_note
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            `;
    document.getElementById("tasks").innerHTML += content;
  }

  // ======================= << Deleting Functions >> ====================

  let DeleteButtons = document.getElementsByClassName("btn-delete");
  for (let i = 0; i < DeleteButtons.length; i++) {
    DeleteButtons[i].addEventListener("click", function () {
      let userConfirmed = confirm(
        "Are you sure you want to delete " + tasks[i].title + " task  ? "
      );
      // Check if the user confirmed
      if (userConfirmed) {
        tasks.splice(i, 1);
        saveToLocalStorage();
        fillNewTask();
      }
    });
  }

  // ======================= << Edit Functions >> ====================

  let editButtons = document.getElementsByClassName("btn-edit");
  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener("click", function () {
      let newTask = prompt("Edit Your Mission", task.title);
      if (newTask !== null && newTask.trim() !== "") {
        tasks[i].title = newTask;
        saveToLocalStorage();
        fillNewTask();
      }
    });
  }

  // ======================= << Done Functions >> ====================

  let done = document.getElementsByClassName("btn-done");
  for (let i = 0; i < done.length; i++) {
    done[i].addEventListener("click", function () {
      let task = tasks[i];
      task.isDone = !task.isDone;
      saveToLocalStorage();
      fillNewTask();
    });
  }
}

// ======================= << Add Functions >> ====================

document.getElementById("btn-add").addEventListener("click",  () => {
  let newTask = prompt("Write Your Mission", "Mission");
  let objDate = new Date();
  let date =
    objDate.getDate() +
    "." +
    (objDate.getMonth() + 1) +
    "." +
    objDate.getFullYear() +
    " -|- " +
    objDate.getHours() +
    " : " +
    objDate.getMinutes();
  let taskObj = {
    title: newTask,
    date: `${date}`,
    isDone: false,
  };

  try {
    if (!newTask) {
      throw "Invalid,The Task Has been Canceled Or you don't write name of the task";
    } else {
      tasks.push(taskObj);
      saveToLocalStorage();
      fillNewTask();
    }
  } catch (e) {
    alert(`Error : ${e}`);
  }
});

// ============= << Local Storage FUnctions >> ==========

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage on page load
window.onload = function () {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = storedTasks;
  fillNewTask();
};
