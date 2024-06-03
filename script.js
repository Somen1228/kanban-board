//Selections
const modalCont = document.querySelector(".modal-cont")
const addBtn = document.querySelector(".add-btn")
const textArea = document.querySelector(".text-area-cont")
const mainCont = document.querySelector(".main-cont")
const allPriorityColors = document.querySelectorAll(".priority-color")

//Flags
let addTaskFlag = false;


//Variables
let modalPriorityColor = "black";


//Modal pop-up
addBtn.addEventListener('click', () => {
    addTaskFlag = !addTaskFlag;

    if(addTaskFlag) {
        modalCont.style.display = "flex";
    } else {
        modalCont.style.display = "none";
    }
}) 


//Event listener on all the priority colors container in the modal
allPriorityColors.forEach(function(colorElement) {
    colorElement.addEventListener('click', (e) => {
        //Remove active class from all the containers
            allPriorityColors.forEach(function(curr) {
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

    if(e.key == 'Shift') {
        createTicket(ticketId, taskContent, modalPriorityColor);
        //Hide the modal as soon as shift is pressed
        modalCont.style.display = "none";
        //Toggling the display flag of the modal
        addTaskFlag = !addTaskFlag;
        //Resetting the value field to be blank
        textArea.value = "";
    }
})

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

    mainCont.appendChild(ticketCont)
}
