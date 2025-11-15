// Application state
let timerInterval = null;
let timeRemaining = 300; // 5 minutes in seconds
let tasks = [];
let isPaused = false;
let questionnaireCompleted = false; // Track if questionnaire has been completed

// Questionnaire state
let currentSectionIndex = 0;
let formResponses = {};

// Page navigation
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.add('hidden'));

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }
}

// Questionnaire functions
function renderQuestionnaireSection() {
    const section = questionnaireData.sections[currentSectionIndex];
    const content = document.getElementById('questionnaireContent');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    // Update progress
    const progress = ((currentSectionIndex + 1) / questionnaireData.sections.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Section ${currentSectionIndex + 1} of ${questionnaireData.sections.length}`;
    
    // Render section
    content.innerHTML = `
        <div class="section-container">
            <h3 class="section-title">${section.title}</h3>
            <div class="questions-container">
                ${section.questions.map(q => renderQuestion(q, section.id)).join('')}
            </div>
        </div>
    `;
    
    // Restore previous answers if any
    section.questions.forEach(q => {
        const key = `${section.id}_${q.id}`;
        if (formResponses[key]) {
            const input = document.getElementById(key);
            if (input) input.value = formResponses[key];
        }
    });
    
    // Update navigation buttons
    updateNavigationButtons();
}

function renderQuestion(question, sectionId) {
    const fieldId = `${sectionId}_${question.id}`;
    const required = question.required ? 'required' : '';
    
    let inputHTML = '';
    if (question.type === 'textarea') {
        inputHTML = `<textarea 
            id="${fieldId}" 
            name="${fieldId}" 
            class="form-input textarea" 
            placeholder="Be honest... we already know anyway"
            ${required}></textarea>`;
    } else if (question.type === 'select' && question.options) {
        inputHTML = `<select id="${fieldId}" name="${fieldId}" class="form-input" ${required}>
            <option value="">Choose your fate...</option>
            ${question.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
        </select>`;
    } else {
        inputHTML = `<input 
            type="${question.type || 'text'}" 
            id="${fieldId}" 
            name="${fieldId}" 
            class="form-input" 
            ${question.pattern ? `pattern="${question.pattern}"` : ''}
            ${required}>`;
    }
    
    return `
        <div class="form-group">
            <label for="${fieldId}" class="form-label">
                ${question.label}
                ${question.required ? '<span class="required">*</span>' : ''}
            </label>
            ${inputHTML}
        </div>
    `;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevSection');
    const nextBtn = document.getElementById('nextSection');
    const submitBtn = document.getElementById('submitForm');
    
    // Show/hide previous button
    if (currentSectionIndex === 0) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }
    
    // Show next or submit button
    if (currentSectionIndex === questionnaireData.sections.length - 1) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
        // Show disclaimer on last section
        showDisclaimer();
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
}

function saveCurrentSection() {
    const section = questionnaireData.sections[currentSectionIndex];
    section.questions.forEach(q => {
        const key = `${section.id}_${q.id}`;
        const input = document.getElementById(key);
        if (input) {
            formResponses[key] = input.value;
        }
    });
}

function validateCurrentSection() {
    const section = questionnaireData.sections[currentSectionIndex];
    let isValid = true;
    
    section.questions.forEach(q => {
        if (q.required) {
            const key = `${section.id}_${q.id}`;
            const input = document.getElementById(key);
            if (!input || !input.value.trim()) {
                isValid = false;
                input?.classList.add('error');
            } else {
                input?.classList.remove('error');
            }
        }
    });
    
    return isValid;
}

function showDisclaimer() {
    const disclaimerDiv = document.getElementById('disclaimer');
    const disclaimer = questionnaireData.disclaimer;
    
    disclaimerDiv.innerHTML = `
        <h4>${disclaimer.title}</h4>
        <p>${disclaimer.text}</p>
        <ul class="disclaimer-list">
            ${disclaimer.terms.map(term => `<li>✓ ${term}</li>`).join('')}
        </ul>
        <div class="disclaimer-footer">
            <p><strong>Privacy Policy:</strong> ${disclaimer.privacyPolicy}</p>
            <p><strong>Data Retention:</strong> ${disclaimer.dataRetention}</p>
            <p class="warning">${disclaimer.warning}</p>
        </div>
    `;
    disclaimerDiv.classList.remove('hidden');
}

function nextSection() {
    if (validateCurrentSection()) {
        saveCurrentSection();
        if (currentSectionIndex < questionnaireData.sections.length - 1) {
            currentSectionIndex++;
            renderQuestionnaireSection();
            window.scrollTo(0, 0);
        }
    } else {
        alert('Please fill in all required fields before proceeding. We need ALL your secrets.');
    }
}

function previousSection() {
    saveCurrentSection();
    if (currentSectionIndex > 0) {
        currentSectionIndex--;
        renderQuestionnaireSection();
        window.scrollTo(0, 0);
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
    // Reset all state
    tasks = [];
    resetTimer();
    renderTasks();

    // Skip questionnaire if already completed, go directly to timer
    if (questionnaireCompleted) {
        showPage('timerPage');
    } else {
        showPage('questionnairePage');
    }
    currentSectionIndex = 0;
    formResponses = {};
    
    // Hide disclaimer
    const disclaimerDiv = document.getElementById('disclaimer');
    if (disclaimerDiv) {
        disclaimerDiv.classList.add('hidden');
    }
    
    // Re-render questionnaire from beginning
    renderQuestionnaireSection();
    showPage('questionnairePage');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize questionnaire
    renderQuestionnaireSection();
    
    // Questionnaire navigation
    document.getElementById('nextSection').addEventListener('click', nextSection);
    document.getElementById('prevSection').addEventListener('click', previousSection);
    
    // Questionnaire form submission
    const questionnaireForm = document.getElementById('questionnaireForm');
    questionnaireForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        console.log('User started journey:', name);
        questionnaireCompleted = true; // Mark questionnaire as completed
        showPage('timerPage');
        if (validateCurrentSection()) {
            saveCurrentSection();
            console.log('User completed the descent into madness:', formResponses);
            
            // Show a dramatic message before proceeding
            const confirmed = confirm('By submitting this form, you acknowledge that your soul is now property of Sisyphus Inc. Your exes have been notified. Proceed?');
            if (confirmed) {
                showPage('timerPage');
            }
        } else {
            alert('You must complete ALL fields. Your secrets are required for the boulder-pushing ceremony.');
        }
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
