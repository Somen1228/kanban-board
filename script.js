const modalCont = document.querySelector(".modal-cont")
const addBtn = document.querySelector(".add-btn")

let addTaskFlag = false;

addBtn.addEventListener('click', () => {
    addTaskFlag = !addTaskFlag;

    if(addTaskFlag) {
        modalCont.style.display = "flex";
    } else {
        modalCont.style.display = "none";
    }
}) 
