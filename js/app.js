// Gestor de Tareas
class TaskManager {
    constructor() {
        this.tasks = [];
        this.init();
    }

    init() {
        console.log('Task Manager inicializado');
        this.loadFromStorage();
    }

    addTask(description, priority) {
        const task = {
            id: Date.now(),
            description: description,
            priority: priority,
            completed: false,
            createdAt: new Date().toISOString()
        };
        this.tasks.push(task);
        this.saveToStorage();
        return task;
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveToStorage();
    }

    toggleTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveToStorage();
        }
    }

    saveToStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('tasks');
        if (stored) {
            this.tasks = JSON.parse(stored);
        }
    }

    getTasks() {
        return this.tasks;
    }
}

// Instanciar el gestor
const taskManager = new TaskManager();

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

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    
    // Renderizar tareas iniciales
    renderTasks();
    
    // Evento para agregar tarea
    addTaskBtn.addEventListener('click', function() {
        const description = taskInput.value.trim();
        const priority = prioritySelect.value;
        
        if (description === '') {
            alert('Por favor ingrese una descripción para la tarea');
            return;
        }
        
        taskManager.addTask(description, priority);
        renderTasks();
        
        // Limpiar formulario
        taskInput.value = '';
        prioritySelect.value = 'baja';
        taskInput.focus();
    });
    
    // Permitir agregar con Enter
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });
    
    console.log('Aplicación completamente inicializada');
});