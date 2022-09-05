const inputText = document.querySelector("#inputText") as HTMLInputElement
const btn = document.querySelector("#btn") as HTMLButtonElement
const todoList = document.querySelector("#todoList") as HTMLUListElement

interface Todo {
    readonly id: number,
    name: string,
    description: string,
    completed: boolean
}

const readLocalStorage = (): Todo[] => {
    const todos = localStorage.getItem("todos")
    if (todos === null) return []

    return JSON.parse(todos)
}
const Todos: Todo[] = readLocalStorage();
const loadTodos = () => {
    Todos.forEach((todo: Todo) => {
        //create new Elements for todo:
        const li = document.createElement("li");
        const span = document.createElement("span")
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox"
        checkbox.checked = todo.completed
        span.innerHTML = `<h1>${todo.name}</h1> ${todo.description}`
        span.appendChild(checkbox)
        span.id = todo.id.toString()

        li.appendChild(span)
        todoList.appendChild(li)
        checkbox.addEventListener("change", () => checkboxHandler(todo.id))
    })
}

loadTodos()

const AddToList = (todo: Todo) => {

    Todos.push(todo)

    //create new Elements for todo:
    const li = document.createElement("li");
    const span = document.createElement("span")
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox"

    span.innerHTML = `<h1>${todo.name}</h1> ${todo.description}`
    span.appendChild(checkbox)
    span.id = todo.id.toString()

    li.appendChild(span)
    todoList.appendChild(li)
    checkbox.addEventListener("change", () => checkboxHandler(todo.id))

    inputText.value = "";
    setLocalStorage()
}

const formHandler = (e: Event) => {
    e.preventDefault()
    if (inputText.value) {
        AddToList({
            id: new Date().getTime(),
            name: inputText.value,
            description: "lorem lorem",
            completed: false
        })
    }
}

const checkboxHandler = (id: number) => {
    Todos.map((todo: Todo) => {
        if (todo.id === id) {
            todo.completed = !todo.completed
            const span = document.getElementById(`${todo.id}`) as HTMLSpanElement
            const checkbox = span.querySelector("input") as HTMLInputElement
            checkbox.checked = todo.completed
            setLocalStorage()
            return todo
        } else
            return todo
    })
}

const setLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(Todos))
}
btn.addEventListener('click', formHandler);

