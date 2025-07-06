// Récupérer les éléments du DOM
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Charger les tâches depuis LocalStorage au démarrage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

// Fonction pour ajouter une tâche
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Veuillez entrer une tâche !');
        return;
    }

    const task = {
        id: Date.now(), // Identifiant unique basé sur l'heure
        text: taskText,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = ''; // Vider le champ
}

// Fonction pour sauvegarder les tâches dans LocalStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fonction pour afficher les tâches
function renderTasks() {
    taskList.innerHTML = ''; // Vider la liste
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Supprimer</button>
        `;
        taskList.appendChild(li);
    });
}

// Fonction pour marquer une tâche comme terminée
function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
}

// Fonction pour supprimer une tâche
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Ajouter une tâche avec la touche "Entrée"
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});