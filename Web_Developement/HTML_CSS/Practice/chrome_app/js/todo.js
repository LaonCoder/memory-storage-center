const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

LI_CLASSNAME = "toDoPost";
SPAN_CLASSNAME = "toDoSpan";
BUTTON_CLASSNAME = "toDoButton";

const TODOS_KEY = "todos";
let toDos = [];


function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.classList.add(LI_CLASSNAME);
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.classList.add(SPAN_CLASSNAME);
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.classList.add(BUTTON_CLASSNAME);
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);      // span을 li에 포함되도록 만든다.
    li.appendChild(button);
    toDoList.appendChild(li);  // li를 toDoList에 포함되도록 만든다.
}


function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now()  // 랜덤한 id를 반환한다.
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}


function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));  // to do 배열을 로컬 스토리지에 저장한다.
}


function deleteToDo(event) {
    const li = event.target.parentElement;            // 부모 element를 통해 어떤 button이 눌렸는지를 확인할 수 있다.
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));  // 해당 li를 toDos 배열에서 제거한다. (이때 li의 id는 string으로 parseInt()를 해야 한다.)
    li.remove();                                      // 해당 li를 삭제한다.
    saveToDos();
}
  

toDoForm.addEventListener("submit", handleToDoSubmit);


const savedToDos = localStorage.getItem(TODOS_KEY);

if (saveToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;  // 로컬 스토리지에 todo 목록이 이미 존재하는 경우, toDos 배열에 복제한다.
    parsedToDos.forEach(paintToDo);
}
