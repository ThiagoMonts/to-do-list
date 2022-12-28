// Seleção de elementos
const toDoForm = document.querySelector("#to-do-form")
const toDoInput = document.querySelector("#to-do-input")
const toDoList = document.querySelector("#to-do-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")

// Funções

//Eventos
toDoForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const inputValue = toDoInput.value

    if (inputValue) {
        console.log(inputValue)
        //save to do
    }
})