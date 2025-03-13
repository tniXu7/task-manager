document.addEventListener("DOMContentLoaded", () => {
    loadTasks(); // Загружаем задачи при запуске

    // Добавление задачи
    document.getElementById("add-task-form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const taskData = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            status: document.getElementById("status").value,
            due_date: document.getElementById("due_date").value || null
        };

        try {
            const response = await fetch("http://localhost:5001/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData)
            });

            if (response.ok) {
                loadTasks(); // Перезагрузить список задач
                document.getElementById("add-task-form").reset();
            }
        } catch (error) {
            console.error("Ошибка при добавлении задачи:", error);
        }
    });

    // Удаление задачи
    document.getElementById("delete-task-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        const taskId = document.getElementById("task-id").value;

        try {
            const response = await fetch(`http://localhost:5001/tasks/${taskId}`, {
                method: "DELETE"
            });

            if (response.ok) {
                loadTasks(); // Перезагрузить список задач
                document.getElementById("delete-task-form").reset();
            }
        } catch (error) {
            console.error("Ошибка при удалении задачи:", error);
        }
    });

    // Обработчик отмены редактирования
    document.getElementById("cancel-edit").addEventListener("click", () => {
        document.getElementById("edit-task-form").style.display = "none";
    });

    // Обработчик сохранения изменений
    document.getElementById("edit-task-form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const taskId = document.getElementById("edit-task-id").value;
        const updatedTask = {
            title: document.getElementById("edit-title").value,
            description: document.getElementById("edit-description").value,
            status: document.getElementById("edit-status").value,
            due_date: document.getElementById("edit-due_date").value || null
        };

        try {
            const response = await fetch(`http://localhost:5001/tasks/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTask)
            });

            if (response.ok) {
                loadTasks(); // Перезагрузить список задач
                document.getElementById("edit-task-form").style.display = "none";
            }
        } catch (error) {
            console.error("Ошибка при редактировании задачи:", error);
        }
    });
});


// Функция для загрузки задач
async function loadTasks() {
    try {
        const response = await fetch("http://localhost:5001/tasks");
        const data = await response.json();

        const taskList = document.getElementById("task-list");
        taskList.innerHTML = "";

        data.forEach(task => {
            const formattedDate = task.due_date ? formatDate(task.due_date) : "Не задано";

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${task.id}</td>
                <td>${task.title}</td>
                <td>${task.description}</td>
                <td>${task.status}</td>
                <td>${formattedDate}</td>
                <td>
                    <button onclick="editTask(${task.id}, '${task.title}', '${task.description}', '${task.status}', '${task.due_date}')">Редактировать</button>
                </td>
            `;
            taskList.appendChild(row);
        });
    } catch (error) {
        console.error("Ошибка загрузки задач:", error);
    }
}

// Функция для преобразования даты в формат "ДД.ММ.ГГГГ"
function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}


// Функция для редактирования задачи
function editTask(id, title, description, status, due_date) {
    document.getElementById("edit-task-id").value = id;
    document.getElementById("edit-title").value = title;
    document.getElementById("edit-description").value = description;
    document.getElementById("edit-status").value = status;
    document.getElementById("edit-due_date").value = due_date || "";

    document.getElementById("edit-task-form").style.display = "block";
}
