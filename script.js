//Selections
const modalCont = document.querySelector(".modal-cont")
const allFilterColors = document.querySelectorAll(".toolbox-priority-cont > .color")
const addBtn = document.querySelector(".add-btn")
const removeBtn = document.querySelector(".remove-btn")
const textArea = document.querySelector(".text-area-cont")
const mainCont = document.querySelector(".main-cont")
const allPriorityColors = document.querySelectorAll(".priority-color")

//Flags
let addTaskFlag = false;
let removeTaskFlag = false;

//Variables
let modalPriorityColor = "black";
const colors = ["lightpink", "lightgreen", "lightblue", "black"]
const taskArray = []

//Check if we already have data inside local storage

if(localStorage.getItem('tickets')) {
    try {
        const ticketsArray = JSON.parse(localStorage.getItem('tickets'))

        ticketsArray.forEach((ticket) => {
            createTicket(ticket.ticketId, ticket.taskContent, ticket.modalPriorityColor)
        })
    } catch (error) {
        console.log("There seems to be some error")
    }
}


//Modal pop-up
addBtn.addEventListener('click', () => {
    addTaskFlag = !addTaskFlag;

    if (addTaskFlag) {
        modalCont.style.display = "flex";
        addBtn.style.color = "green";
    } else {
        modalCont.style.display = "none";
        addBtn.style.color = "white";
    }
})


//Event listener on all the priority colors container in the modal
allPriorityColors.forEach(function (colorElement) {
    colorElement.addEventListener('click', (e) => {
        //Remove active class from all the containers
        allPriorityColors.forEach(function (curr) { 
            curr.classList.remove("active")
        })

        //Add active class from all the containers
        colorElement.classList.add("active");
        //Storing the current selected color into a variable
        modalPriorityColor = colorElement.getAttribute("colorVal");
    })
})

//Adding task
modalCont.addEventListener('keydown', (e) => {
    const taskContent = e.target.value;
    const ticketId = shortid();

    if (e.key == 'Shift') {
        createTicket(ticketId, taskContent, modalPriorityColor);
        //Hide the modal as soon as shift is pressed
        modalCont.style.display = "none";
        //add button turns white 
        addBtn.style.color = "white"
        //Toggling the display flag of the modal
        addTaskFlag = !addTaskFlag;
        //Resetting the value field to be blank
        textArea.value = "";
    }
})

//Deleting ticket
removeBtn.addEventListener('click', () => {
    removeTaskFlag = !removeTaskFlag

    if(removeTaskFlag) {
        alert("Delete mode activated!")
        removeBtn.style.color = "red";
    } else {
        alert("Delete mode deactivated!")
        removeBtn.style.color = "white"
    }
})

//Event listener for lock



//Function to add a new ticket/task
function createTicket(ticketId, taskContent, modalPriorityColor) {
    //Create a new ticket container element
    const ticketCont = document.createElement("div")
    ticketCont.classList.add("ticket-cont");

    ticketCont.innerHTML =
    `
        <div class="ticket-color ${modalPriorityColor}"></div>
        <div class="ticket-id">${ticketId}</div>
        <div class="task-area">${taskContent}</div>
        <div class="ticket-lock">
            <i class="fa-solid fa-lock"></i>
        </div>
    `

    taskArray.push({ ticketId, taskContent, modalPriorityColor })
    
    changeBandColor(ticketCont, ticketId) 
    handleLock(ticketCont, ticketId)
    handleRemoval(ticketCont, ticketId)

    //Adding a local storage
    localStorage.setItem('tickets', JSON.stringify(taskArray))
    mainCont.appendChild(ticketCont)
}

function changeBandColor(ticketCont, ticketId) {
//     const ticketColor = ticketCont.querySelector(".ticket-color")
//     ticketColor.addEventListener('click', () => {
//         const bandColor = ticketColor.classList[1];
// 
//         let index = 0;
//         colors.forEach((color, idx) => {
//             if (color == bandColor && idx != colors.length - 1) {
//                 index = idx + 1;
//             }
//         })
// 
//         let newColor = colors[index];
// 
//         ticketColor.classList.remove(bandColor)
//         ticketColor.classList.add(newColor)
//     })
        //Other way to do the same
        const colorElem = ticketCont.querySelector(".ticket-color")
        colorElem.addEventListener('click', () => {
            const currentColor = colorElem.classList[1]
            let currentColorIndex = colors.findIndex((currentStepColor) => {
                return currentStepColor == currentColor;
            })

            currentColorIndex++
            currentColorIndex %= colors.length;
            const newColor = colors[currentColorIndex]

            colorElem.classList.remove(currentColor)
            colorElem.classList.add(newColor)

            const currentTask = taskArray.find((currentStepFilter) => {
                return currentStepFilter.ticketId == ticketId
            })

            currentTask.modalPriorityColor = newColor
            localStorage.setItem('tickets', JSON.stringify(taskArray))
            // console.log({taskArray});
        })     
}

//Function to handle removal 

function handleRemoval(ticketCont, taskId) {
    ticketCont.addEventListener('click', () => {

        if(removeTaskFlag) {
            ticketCont.remove();

            //Removing from array object
            const currentTaskIndex = taskArray.findIndex((currentStepTask) => {
                return taskId == currentStepTask.ticketId
            })
    
            taskArray.splice(currentTaskIndex, 1)
            localStorage.setItem('tickets', JSON.stringify(taskArray))
        }

        console.log(taskArray);
    })
}


//Function to lock/unlock the lock icon
function handleLock(ticketCont, ticketId) {
    const ticketLockElement = ticketCont.querySelector(".ticket-lock")
    //Selecting the icon element
    const ticketLockIcon = ticketLockElement.children[0];
    //Selecting the taskArea to enable editing
    const taskArea = ticketCont.querySelector(".task-area")

    ticketLockIcon.addEventListener('click', () => {
        if(ticketLockIcon.classList.contains("fa-lock")) {
            ticketLockIcon.classList.remove("fa-lock")
            ticketLockIcon.classList.add("fa-unlock")
            taskArea.setAttribute("contenteditable", "true"); //editable
        } else {
            ticketLockIcon.classList.add("fa-lock")
            ticketLockIcon.classList.remove("fa-unlock")
            taskArea.setAttribute("contenteditable", "false"); //non-editable

            const currentTask = taskArray.find((currentStepFilter) => {
                return currentStepFilter.ticketId == ticketId
            })
    
            currentTask.taskContent = taskArea.innerHTML
            localStorage.setItem('tickets', JSON.stringify(taskArray))

            // console.log({taskArray});
        }       
    })
}

allFilterColors.forEach((colorElem) => {

    colorElem.addEventListener('click', (e) => {
        const selectFilterColor = colorElem.classList[0]
        
        const filteredArray = taskArray.filter((currTask) => {
            return currTask.modalPriorityColor == selectFilterColor
        })

        //Remove all task from the screen
        mainCont.innerHTML = ""

        //Add back task from filtered array
        filteredArray.forEach((task) => {
            createTicket(task.taskId, task.taskContent, task.modalPriorityColor)
        })
    })
})
