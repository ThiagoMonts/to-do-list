// Seleção de elementos
const toDoForm = document.querySelector("#to-do-form")
const toDoInput = document.querySelector("#to-do-input")
const toDoList = document.querySelector("#to-do-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")

// Funções
const saveToDo = (text) => {
    const toDo = document.createElement("div")
    toDo.classList.add("to-do")

    const toDoTitle = document.createElement("h3")
    toDoTitle.innerText = text
    toDo.appendChild(toDoTitle)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-to-do")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    toDo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-to-do")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    toDo.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-to-do")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    toDo.appendChild(deleteBtn)

    toDoList.appendChild(toDo)

    toDoInput.value = ""
    toDoInput.focus()
}

//Eventos
toDoForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const inputValue = toDoInput.value

    if (inputValue) {
        saveToDo(inputValue)
    }
})