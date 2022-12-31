// Seleção de elementos
const toDoForm = document.querySelector("#to-do-form")
const toDoInput = document.querySelector("#to-do-input")
const toDoList = document.querySelector("#to-do-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue

// Funções
const saveToDo = (text, done = 0, save = 1) => {
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

    if (done) {
        toDo.classList.add("done")
    }

    if (save) {
        saveToDoLocalStorage({ text, done: 0 })
    }

    toDoList.appendChild(toDo)

    toDoInput.value = ""
}

const toggleForms = () => {
    editForm.classList.toggle("hide")
    toDoForm.classList.toggle("hide")
    toDoList.classList.toggle("hide")
}

const updateToDo = (text) => {
    const toDos = document.querySelectorAll(".to-do")

    toDos.forEach((toDo) => {
        let toDoTitle = toDo.querySelector("h3")

        if (toDoTitle.innerText === oldInputValue) {
            toDoTitle.innerText = text

            updateToDoLocalStorage(oldInputValue, text)
        }
    })
}

const getSearchedToDos = (search) => {
    const toDos = document.querySelectorAll(".to-do")

    toDos.forEach((toDo) => {
        const toDoTitle = toDo.querySelector("h3").innerText.toLowerCase()

        toDo.style.display = "flex"

        console.log(toDoTitle)

        if (!toDoTitle.includes(search)) {
            toDo.style.display = "none"
        }
    })
}

const filterToDos = (filterValue) => {
    const toDos = document.querySelectorAll(".to-do")

    switch (filterValue) {
        case "all":
            toDos.forEach((toDo) => (toDo.style.display = "flex"))
            break

        case "done":
            toDos.forEach((toDo) =>
                toDo.classList.contains("done")
                    ? (toDo.style.display = "flex")
                    : (toDo.style.display = "none"))
            break

        case "toDo":
            toDos.forEach((toDo) =>
                toDo.classList.contains("to-do")
                    ? (toDo.style.display = "flex")
                    : (toDo.style.display = "none"))
            break

        default:
            break
    }
}

//Eventos
toDoForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const inputValue = toDoInput.value

    if (inputValue) {
        saveToDo(inputValue)
    }
})

document.addEventListener("click", (e) => {
    const targetEl = e.target
    const parentEl = targetEl.closest("div")
    let toDoTitle

    if (parentEl && parentEl.querySelector("h3")) {
        toDoTitle = parentEl.querySelector("h3").innerText
    }

    if (targetEl.classList.contains("finish-to-do")) {
        parentEl.classList.toggle("done")

        updateToDoStatusLocalStorage(toDoTitle)
    }

    if (targetEl.classList.contains("remove-to-do")) {
        parentEl.remove()

        removeToDoLocalStorage(toDoTitle)
    }

    if (targetEl.classList.contains("edit-to-do")) {
        toggleForms()

        editInput.value = toDoTitle
        oldInputValue = toDoTitle
    }
})

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault()

    toggleForms()
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const editInputValue = editInput.value

    if (editInputValue) {
        updateToDo(editInputValue)
    }

    toggleForms()
})

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value

    getSearchedToDos(search)
})

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    searchInput.value = ""

    searchInput.dispatchEvent(new Event("keyup"))
})

filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value

    filterToDos(filterValue)
})

const getToDosLocalStorage = () => {
    const toDos = JSON.parse(localStorage.getItem("toDos")) || []

    return toDos
}

const loadToDos = () => {
    const toDos = getToDosLocalStorage()

    toDos.forEach((toDo) => {
        saveToDo(toDo.text, toDo.done, 0)
    })
}

const saveToDoLocalStorage = (toDo) => {
    const toDos = getToDosLocalStorage()

    toDos.push(toDo);

    localStorage.setItem("toDos", JSON.stringify(toDos))
}

const removeToDoLocalStorage = (toDoText) => {
    const toDos = getToDosLocalStorage()

    const filteredToDos = toDos.filter((toDo) => toDo.text != toDoText)

    localStorage.setItem("toDos", JSON.stringify(filteredToDos));
}

const updateToDoStatusLocalStorage = (toDoText) => {
    const toDos = getToDosLocalStorage()

    toDos.map((toDo) =>
        toDo.text === toDoText ? (toDo.done = !toDo.done) : null
    )

    localStorage.setItem("toDos", JSON.stringify(toDos))
}

const updateToDoLocalStorage = (toDoOldText, toDoNewText) => {
    const toDos = getToDosLocalStorage()

    toDos.map((toDo) =>
        toDo.text === toDoOldText ? (toDo.text = toDoNewText) : null
    )

    localStorage.setItem("toDos", JSON.stringify(toDos))
}

loadToDos()