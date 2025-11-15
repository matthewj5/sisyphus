// Application state
let timerInterval = null;
let timeRemaining = 300; // 5 minutes in seconds
let tasks = [];
let isPaused = false;
let questionnaireCompleted = false; // Track if questionnaire has been completed

// Page navigation
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.add('hidden'));

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }
}

// Timer functions
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimerDisplay() {
    const timerValue = document.getElementById('timerValue');
    timerValue.textContent = formatTime(timeRemaining);

    // Add warning class when time is running low
    if (timeRemaining <= 30) {
        timerValue.classList.add('timer-warning');
    } else {
        timerValue.classList.remove('timer-warning');
    }
}

function startTimer() {
    if (timerInterval) return; // Already running

    isPaused = false;
    document.getElementById('startTimer').classList.add('hidden');
    document.getElementById('pauseTimer').classList.remove('hidden');

    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeRemaining--;
            updateTimerDisplay();

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                goToHell('Time ran out! The boulder has fallen.');
            }
        }
    }, 1000);
}

function pauseTimer() {
    isPaused = true;
    document.getElementById('startTimer').classList.remove('hidden');
    document.getElementById('pauseTimer').classList.add('hidden');
}

function resetTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    timeRemaining = 300;
    isPaused = false;
    updateTimerDisplay();
    document.getElementById('startTimer').classList.remove('hidden');
    document.getElementById('pauseTimer').classList.add('hidden');
}

// Task functions
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    tasks.push({
        id: Date.now(),
        text: taskText,
        completed: false
    });

    taskInput.value = '';
    renderTasks();
}

function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    renderTasks();
}

function renderTasks() {
    const tasksList = document.getElementById('tasksList');

    if (tasks.length === 0) {
        tasksList.innerHTML = '<li class="no-tasks">No tasks yet. Add one above!</li>';
        return;
    }

    tasksList.innerHTML = tasks.map(task => `
        <li class="task-item ${task.completed ? 'completed' : ''}">
            <input
                type="checkbox"
                ${task.completed ? 'checked' : ''}
                onchange="toggleTask(${task.id})"
            >
            <span class="task-text">${task.text}</span>
            <button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>
        </li>
    `).join('');
}

// Hell page function
function goToHell(message) {
    const hellMessage = document.getElementById('hellMessage');
    hellMessage.textContent = message;
    showPage('hellPage');
}

// Restart the application
function restart() {
    tasks = [];
    resetTimer();
    renderTasks();

    // Skip questionnaire if already completed, go directly to timer
    if (questionnaireCompleted) {
        showPage('timerPage');
    } else {
        showPage('questionnairePage');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Questionnaire form
    const questionnaireForm = document.getElementById('questionnaireForm');
    questionnaireForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        console.log('User started journey:', name);
        questionnaireCompleted = true; // Mark questionnaire as completed
        showPage('timerPage');
    });

    // Timer controls
    document.getElementById('startTimer').addEventListener('click', startTimer);
    document.getElementById('pauseTimer').addEventListener('click', pauseTimer);

    // Task management
    document.getElementById('addTaskBtn').addEventListener('click', addTask);
    document.getElementById('taskInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Navigate to camera page
    document.getElementById('goToCameraBtn').addEventListener('click', () => {
        showPage('cameraPage');
    });

    // Camera validation buttons
    document.getElementById('cameraSuccessBtn').addEventListener('click', () => {
        showPage('timerPage');
    });

    document.getElementById('cameraFailBtn').addEventListener('click', () => {
        goToHell('Camera validation failed! You cannot continue without proper surveillance.');
    });

    // Restart button
    document.getElementById('restartBtn').addEventListener('click', restart);

    // Initialize
    showPage('questionnairePage');
    renderTasks();
});
