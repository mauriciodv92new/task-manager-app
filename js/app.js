// Aplicación de Gestor de Tareas
console.log('Aplicación iniciada');

// Función para renderizar tareas
function renderTasks() {
    const taskListElement = document.getElementById('taskList');
    const tasks = taskManager.getTasks();
    
    if (tasks.length === 0) {
        taskListElement.innerHTML = '<p style="text-align:center; color:#999;">No hay tareas registradas</p>';
        return;
    }
    
    taskListElement.innerHTML = tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}">
            <div class="task-info">
                <div class="task-description">${task.description}</div>
                <div class="task-meta">
                    <span class="priority-badge priority-${task.priority}">
                        ${task.priority.toUpperCase()}
                    </span>
                    <span>${new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="btn-complete" onclick="toggleTask(${task.id})">
                    ${task.completed ? 'Reabrir' : 'Completar'}
                </button>
                <button class="btn-delete" onclick="deleteTask(${task.id})">
                    Eliminar
                </button>
            </div>
        </div>
    `).join('');
}

// Funciones auxiliares para los eventos
function toggleTask(id) {
    taskManager.toggleTask(id);
    renderTasks();
}

function deleteTask(id) {
    if (confirm('¿Está seguro de eliminar esta tarea?')) {
        taskManager.deleteTask(id);
        renderTasks();
    }
}