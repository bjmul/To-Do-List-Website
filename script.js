//Selectors (DOM)
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener("change", filterTodo);

//Functions

function addTodo(e) {
    //prevent form from submitting
    e.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')
    //create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add todo to localstorage
    saveLocalTodos(todoInput.value);
    //important button
    const importantButton = document.createElement('button');
    importantButton.innerHTML = '<i class="fa-regular fa-star"></i>';
    importantButton.classList.add('important-btn')
    todoDiv.appendChild(importantButton);
    //check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-regular fa-square-check"></i>';
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton);
    //delete button
    const deletedButton = document.createElement('button');
    deletedButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    deletedButton.classList.add('deleted-btn')
    todoDiv.appendChild(deletedButton);
    //append to list
    todoList.appendChild(todoDiv);
    //clear todo input value
    todoInput.value = null;
}

function deleteCheck(e) {
    const item = e.target;
    //delete todo
    if(item.classList[0] === 'deleted-btn') {
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
        todo.remove();
        });
    }
    //check todo 
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
    //priority
    if(item.classList[0] === 'important-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('priority');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) { 
        const mStyle = todo.style;  
        if(mStyle != undefined && mStyle != null){
            switch (e.target.value) {
                case "all":
                    mStyle.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains('completed')) {
                        mStyle.display = 'flex';
                    } else {
                        mStyle.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (todo.classList.contains('completed')){
                        mStyle.display = 'none';
                    }
                    else{
                        mStyle.display = "flex";
                    }
                    break;
                case "priority":
                    if (todo.classList.contains('priority')) {
                        mStyle.display = 'flex';
                    }
                    else {
                        mStyle.display = 'none';
                    }
            }
        }
    })
}

function saveLocalTodos(todo) {
    //check if there is already on local
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos=[];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    //check if there is already on local
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos=[];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo')
        //create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //important button
        const importantButton = document.createElement('button');
        importantButton.innerHTML = '<i class="fa-regular fa-star"></i>';
        importantButton.classList.add('important-btn')
        todoDiv.appendChild(importantButton);
        //check button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa-regular fa-square-check"></i>';
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton);
        //delete button
        const deletedButton = document.createElement('button');
        deletedButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
        deletedButton.classList.add('deleted-btn')
        todoDiv.appendChild(deletedButton);
        //append to list
        todoList.appendChild(todoDiv);
        });
}

function removeLocalTodos(todo) {
    //check if there is already on local
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos=[];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos)); 
}

