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