// Función para agregar una nueva tarea
document.getElementById("taskForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;

    if (!title || !description) {
        alert("Por favor, ingresa un título y una descripción para la tarea.");
        return;
    }

    const taskData = {
        title: title,
        description: description,
    };

    fetch("http://127.0.0.1:8000/tasks/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
    })
    .then(response => response.json())
    .then(data => {
        alert("Tarea agregada con éxito.");
        loadTasks(); // Recargar tareas después de agregar
    })
    .catch((error) => {
        console.error("Error:", error);
    });
});

// Función para cargar todas las tareas desde el backend
function loadTasks() {
    fetch("http://127.0.0.1:8000/tasks/")
    .then(response => response.json())
    .then(data => {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";  // Limpiar la lista de tareas antes de agregar nuevas

        if (data.length === 0) {
            taskList.innerHTML = "<p>No hay tareas pendientes.</p>";
        }

        data.forEach(task => {
            const taskElement = document.createElement("li");
            taskElement.innerHTML = `
                <span><strong>${task.title}</strong>: ${task.description}</span>
            `;
            taskList.appendChild(taskElement);
        });
    })
    .catch((error) => {
        console.error("Error al cargar tareas:", error);
    });
}

// Cargar las tareas al inicio
window.onload = loadTasks;