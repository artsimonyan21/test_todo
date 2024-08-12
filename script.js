document.addEventListener("DOMContentLoaded", () => {
  const todoContent = document.getElementById("todoContent");
  const todoInput = document.getElementById("todoInput");
  const addTodoButton = document.getElementById("addTodoButton");

  const loadTodos = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach((todo) => addTodoToDOM(todo));
  };

  const saveTodos = () => {
    const todos = Array.from(todoContent.children).map((todoItem) => ({
      text: todoItem.querySelector("label").textContent,
      checked: todoItem.querySelector("input").checked,
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodoToDOM = (todo = { text: "", checked: false }) => {
    const todoItem = document.createElement("div");
    todoItem.className = "todo_item";
    todoItem.innerHTML = `
        <div class="is_done_delete_wrapper">
        <div class="is_done">
            <input type="checkbox" ${todo.checked ? "checked" : ""} />
            <span>Is done</span>
        </div>
         <button class="delete_todo">Delete</button>
        </div>
            <label>${todo.text}</label>`;
    todoContent.appendChild(todoItem);

    todoItem.querySelector(".delete_todo").addEventListener("click", () => {
      todoItem.remove();
      saveTodos();
    });

    todoItem
      .querySelector('input[type="checkbox"]')
      .addEventListener("change", () => {
        saveTodos();
      });
  };

  addTodoButton.addEventListener("click", () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
      addTodoToDOM({ text: todoText, checked: false });
      todoInput.value = "";
      saveTodos();
    }
  });

  loadTodos();
});
