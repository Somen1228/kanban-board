//Selections
const modalCont = document.querySelector(".modal-cont")
const addBtn = document.querySelector(".add-btn")
const textArea = document.querySelector(".text-area-cont")
const priorityColorCont = document.querySelector(".priority-color-container")
const mainCont = document.querySelector(".main-cont")

//Flags
let addTaskFlag = false;


//Variables


addBtn.addEventListener('click', () => {
    addTaskFlag = !addTaskFlag;

    if(addTaskFlag) {
        modalCont.style.display = "flex";
    } else {
        modalCont.style.display = "none";
    }
}) 

modalCont.addEventListener('keydown', (e) => {
    let value = e.target.value;

    if(e.key == 'Shift') {
        createTicket(value);

        //Hide the modal as soon as shift is pressed
        modalCont.style.display = "none";
        //Toggling the display flag of the modal
        addTaskFlag = !addTaskFlag;
        //Resetting the value field to be blank
        textArea.value = "";
    }
})

//Function to add a new ticket/task
function createTicket(value) {
    //Create a new ticket container element
    const ticketCont = document.createElement("div")
    ticketCont.classList.add("ticket-cont");

    ticketCont.innerHTML = 
    `
    <div class="ticket-color"></div>
    <div class="ticket-id">123456</div>
    <div class="task-area">${value}</div>
    <div class="ticket-lock">
        <i class="fa-solid fa-lock"></i>
    </div>
    `

    mainCont.appendChild(ticketCont)
}