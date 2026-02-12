// --- МОДУЛЬ А: ОЦЕНКИ ---
function runGrades() {
    let val = document.getElementById('gradesInput').value;
    let resultBox = document.getElementById('gradesResult');
    
    // Превращаем текст "5,4,3" в список чисел [5, 4, 3]
    let arr = val.split(',').map(Number);
    
    // Проверка на ошибку
    if (val === "" || arr.some(isNaN)) {
        resultBox.innerText = "Ошибка! Введите числа через запятую.";
        return;
    }

    let sum = arr.reduce((a, b) => a + b, 0);
    let avg = (sum / arr.length).toFixed(2);
    
    resultBox.innerText = `Средний: ${avg} | Кол-во: ${arr.length} | Max: ${Math.max(...arr)}`;
}

// --- МОДУЛЬ Б: ТЕМПЕРАТУРА ---
function runTemp() {
    let num = parseFloat(document.getElementById('tempInput').value);
    let mode = document.getElementById('tempMode').value;
    let res;

    if (mode === "CtoF") res = (num * 9/5) + 32;
    else res = (num - 32) * 5/9;

    document.getElementById('tempResult').innerText = "Результат: " + res.toFixed(1);
}

// --- МОДУЛЬ В: TODO (ДЕЛА) ---
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

function renderTasks() {
    let list = document.getElementById('todoList');
    list.innerHTML = ""; // Очищаем список перед отрисовкой
    
    tasks.forEach((t, i) => {
        list.innerHTML += `
            <div class="${t.completed ? 'done' : ''}">
                <span onclick="toggleTask(${i})">${t.text}</span>
                <button onclick="deleteTask(${i})">🗑️</button>
            </div>`;
    });
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

function runTodo() {
    let inp = document.getElementById('todoInput');
    if (inp.value) {
        tasks.push({ text: inp.value, completed: false });
        inp.value = "";
        renderTasks();
    }
}

function toggleTask(i) {
    tasks[i].completed = !tasks[i].completed;
    renderTasks();
}

function deleteTask(i) {
    tasks.splice(i, 1);
    renderTasks();
}

// Запускаем список дел при старте страницы
renderTasks();